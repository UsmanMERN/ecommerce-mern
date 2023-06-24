import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  braintreePayments,
  braintreeToken,
  createProduct,
  deleteProduct,
  filterProducts,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  productCategory,
  productCount,
  productsPerPage,
  relatedProducts,
  searchProduct,
  updateProduct,
} from "../controller/productController.js";

const router = express.Router();

// routes

// create product

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProduct
);

// get products
router.get("/get-products", getAllProducts);

// get single product
router.get("/get-product/:slug", getSingleProduct);

// get photo
router.get("/get-photo/:pid", getProductPhoto);

// delete product
router.delete("/delete-product/:pid", isAdmin, deleteProduct);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

// filter products
router.post("/filter-products", filterProducts);

// product count
router.get("/product-count", productCount);

// products per page
router.get("/products-list/:page", productsPerPage);

// search product

router.get("/search/:keyword", searchProduct);

// related products

router.get("/related-product/:pid/:cid", relatedProducts);

// get category product
router.get("/product-category/:slug", productCategory);

// payments route
router.get("/braintree/token", braintreeToken);

// payment route
router.post("/braintree/payment", requireSignIn, braintreePayments);
export default router;
