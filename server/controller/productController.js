import slugify from "slugify";
import { productModel } from "../models/productModel.js";
import { CategoryModel } from "../models/categoryModel.js";
import fs from "fs";
import handleError from "../utils/handleError.js";
import braintree from "braintree";
import { orderModel } from "../models/orderModel.js";
import { config } from "dotenv";
config();
// create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "quantity",
    ];
    for (const field of requiredFields) {
      if (!req.fields[field]) {
        return res.status(500).send({
          error: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        });
      }
    }

    if (photo && photo.size > 1000000) {
      return res
        .status(500)
        .send({ error: "Photo is required and should be less than 1mb" });
    }

    const slug = slugify(name, { lowercase: true });

    const product = new productModel({
      ...req.fields,
      slug,
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error creating product");
  }
};

// Get Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error fetching products");
  }
};

// single product
export const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(slug);
    const product = await productModel
      .findOne({ slug: slug })
      .select("-photo")
      .populate("category");
    return res.status(200).send({
      success: true,
      message: "fetched single product",
      product,
    });
  } catch (error) {
    return handleError(res, 500, "Server Error fetching single product");
  }
};

// get photo
export const getProductPhoto = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");
    if (product?.photo.data) {
      res.set("Content-type", product?.photo.contentType);
      return res.status(200).send(product?.photo.data);
    }
  } catch (error) {
    return handleError(res, 500, "Server Error fetching photo");
  }
};

// delete product

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    console.log(pid);
    await productModel.findByIdAndDelete(pid);
    console.log(pid);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return handleError(res, 500, "Server Error deleting product");
  }
};

// update [product]

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    // console.log("Inside try block");

    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "quantity",
    ];
    for (const field of requiredFields) {
      if (!req.fields[field]) {
        return res.status(400).send({
          error: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        });
      }
    }

    if (photo) {
      return res
        .status(400)
        .send({ error: "Photo is required and should be less than 1mb" });
    }

    const slug = slugify(name, { lower: true });

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error updating product");
  }
};

export const filterProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Checkboxes
    if (checked && checked.length > 0) {
      args.category = { $in: checked };
    }

    // Radio buttons
    if (radio && radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await productModel.find(args);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error: Failed to filter products",
    });
  }
};

// count products
export const productCount = async (req, res) => {
  try {
    const total_products = await productModel.find({}).countDocuments();
    res.status(200).send({
      success: true,
      message: `Total Products ${total_products}`,
      total_products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error counting product");
  }
};

// products list
export const productsPerPage = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error counting product");
  }
};

// search products
export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || !keyword.trim())
      throw new Error("Please enter a valid keyword.");
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    // console.log(results);
    res.status(200).send({
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error searching product");
  }
};

// Related products
export const relatedProducts = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const relatedProducts = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      relatedProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error searching product");
  }
};

export const productCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error token getting");
  }
};

// payments
// payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
// token
export const braintreeToken = async (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => res.status(500).send(err));
};

// payments
export const braintreePayments = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    console.log(cart);
    let total = 0;
    cart.map((i) => {
      total += parseInt(i.price);
    });
    // create a transaction on the Braintree Gateway
    let newTranscription = gateway.transaction.sale(
      {
        amount: `${total}`,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            buyer: req.user._id,
            product: cart,
            payment: result,
          }).save();
          return res.json({ ok: true });
        } else {
          return res.status(422).json({ error });
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error while payment");
  }
};
