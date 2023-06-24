import React from "react";
import { Link } from "react-router-dom";
import { PORT } from "../../index";
import { useCartContext } from "../../context/cartContext";
import { motion } from "framer-motion";
export default function Product({ product }) {
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

  return (
    <>
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3 my-2"
        key={product._id}
        style={{ width: "20rem" }}
      >
        <div className="card shadow-lg">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={`${PORT}/api/v1/product/get-photo/${product._id}`}
            className="card-img-top img-fluid p-1"
            style={{ height: "215px" }}
            alt={product.name}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <div className="d-flex justify-content-between align-items-center my-3">
              <p className="card-text mb-0">
                {product.description && product.description.length >= 10
                  ? product.description.slice(0, 20) + "..."
                  : product.description}
              </p>
              <p className="card-text fs-5 fw-bold text-success">
                ${product.price}
              </p>
            </div>
            <div className="d-flex justify-content-around align-items-center my-3">
              <Link
                className="text-decoration-none ms-2"
                to={`/get-product/${product.slug}`}
              >
                <motion.button
                  className="btn btn-primary rounded-0"
                  whileHover={{ scale: 0.93, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                >
                  View Details
                </motion.button>
              </Link>
              <motion.button
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                className="btn btn-outline-success rounded-0 me-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
