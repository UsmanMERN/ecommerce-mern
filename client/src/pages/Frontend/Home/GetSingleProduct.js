import React, { useEffect, useState } from "react";
import Layout from "../../../components/Frontend/Layout";
import HeroSection from "../../../components/Frontend/HeroSection";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PORT } from "../../../index";
import Product from "../../../components/Frontend/Product";
import { useCartContext } from "../../../context/cartContext";
import { motion } from "framer-motion";

export default function GetSingleProduct() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCartContext([]);

  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item._id === product._id);

    if (isProductInCart) {
      window.showToast("Product is already added to your cart", "warning");
      return;
    }

    const updatedCart = [...cart, product];
    const updatedCartJSON = JSON.stringify(updatedCart);

    try {
      localStorage.setItem("cart", updatedCartJSON);
      setCart(updatedCart);
      window.showToast(`${product?.name} added to Cart`, "success");
    } catch (error) {
      if (
        error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED"
      ) {
        window.showToast(
          "Your cart is full. Remove items to add new ones",
          "info"
        );
      } else {
        console.error("Failed to add item to cart:", error);
      }
    }
  };
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${PORT}/api/v1/product/get-product/${params?.slug}`
      );

      if (data?.success) {
        const productData = data?.product;
        setProduct(productData);
        getRelatedProducts(productData?._id, productData?.category._id);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // get related products
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${PORT}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.relatedProducts || []);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params?.slug]);

  const products = relatedProducts || [];

  return (
    <Layout
      title={isLoading ? "Loading..." : `About - ${product?.name}`}
      description={
        isLoading
          ? "Loading product information..."
          : `Learn more about ${product?.name} at TrendBlend.`
      }
      keyword={
        product ? `${product?.name}, TrendBlend, e-commerce, product` : ""
      }
      author="Usman"
    >
      <HeroSection
        page={isLoading ? "Loading..." : `About - ${product?.name}`}
        paragraph={
          isLoading
            ? "Loading product information..."
            : `About - ${product?.description.substring(0, 60)}`
        }
        heading={isLoading ? "" : product?.name}
        style="other"
      />
      {!isLoading && !error && (
        <div className="container mt-5 mb-3">
          <div className="row">
            <div className="col-12 col-md-6 my-3 d-flex justify-content-center">
              <motion.img
                src={`${PORT}/api/v1/product/get-photo/${product?._id}`}
                className="card-img-top img-fluid rounded-2"
                alt={product?.name}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="text-center">
                <h2 className="text-center bg-danger py-3 text-white">
                  Product Details
                </h2>
                <hr />
              </div>
              <div className="product-details my-3">
                <h3 className="product-name mb-3">{product?.name}</h3>
                <p className="product-category text-uppercase">
                  {product?.category?.name}
                </p>
                <p className="product-description">{product?.description}</p>
                <div className="product-info mt-4">
                  <h4 className="product-price text-success">
                    ${product?.price}
                  </h4>
                </div>
                <div className="category text-center mt-md-4 mt-2">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    className="btn btn-secondary rounded-0 w-100"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center my-5"
          style={{ minWidth: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container mt-2">
          <div className="row d-flex justify-content-center align-items-center my-3">
            <h2 className="text-center">Related Products</h2>
            <p className="my-3 text-center">Found {products?.length}</p>
            {products &&
              products?.map((product) => (
                <Product product={product} key={product?._id} />
              ))}
          </div>
        </div>
      )}
      {error && <p className="text-danger">Error: {error.message}</p>}
    </Layout>
  );
}
