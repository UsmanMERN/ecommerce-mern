import React, { useEffect, useState } from "react";

// payments
import DropIn from "braintree-web-drop-in-react";
// contexts
import { useCartContext } from "../../../context/cartContext";
import { useAuthContext } from "../../../context/AuthContext";
import { PORT } from "../../../index";
import { useNavigate } from "react-router-dom";
// components
import Layout from "../../../components/Frontend/Layout";
import HeroSection from "../../../components/Frontend/HeroSection";
import axios from "axios";
// motion
import { motion } from "framer-motion";
// icons
import { BsFillCreditCardFill } from "react-icons/bs";
function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useCartContext();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const { auth } = useAuthContext();
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting;

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    const updatedCartJSON = JSON.stringify(updatedCart);

    try {
      localStorage.setItem("cart", updatedCartJSON);
      setCart(updatedCart);
      window.showToast("Product removed from cart", "success");
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  // total price
  const totalPrice = () => {
    let subtotalPrice = 0;
    try {
      cart?.map((item) => {
        subtotalPrice += item.price;
      });
      return subtotalPrice.toLocaleString("en-US", {
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
        style: "currency",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // get payments gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${PORT}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayments = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      // Create a new array without the 'image' property

      const { data } = await axios.post(
        `${PORT}/api/v1/product/braintree/payment`,
        { cart, nonce }
      );

      // console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      window.location = "/dashboard/user/orders";
      window.showToast("Payment completed successfully", "success");
    } catch (error) {
      console.error(error);
      window.showToast(error.message, "error");
    }
  };
  return (
    <>
      <Layout
        title="Cart Page"
        description="Review and manage items in your cart"
        keywords="cart, shopping, items, manage"
        author="Usman"
      >
        <HeroSection
          heading="Your Cart"
          paragraph="Review and manage items in your cart"
          style="other"
          page="cart"
        />
        {isLoading ? (
          <div className="text-center py-5">
            <div className="text-center my-5">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div className="container py-3">
            <div className="row">
              {auth && auth.user && (
                <div className="col-12">
                  <p className="fs-3 text-center mb-4">{`${greeting}, ${auth.user.name}`}</p>
                </div>
              )}
              <div className="col-lg-8">
                {cart && cart?.length > 0 ? (
                  cart?.map((product) => (
                    <div className="card shadow-sm mb-4" key={product?._id}>
                      <div className="row g-0 d-flex justify-content-between align-items-center ">
                        <div className="col-md-4">
                          <motion.img
                            whileHover={{ scale: 0.9 }}
                            src={`${PORT}/api/v1/product/get-photo/${product?._id}`}
                            alt={product.name}
                            className="card-img p-1"
                          />
                        </div>
                        <div className="col-md-5">
                          <div className="card-body">
                            <h5 className="card-title">{product?.name}</h5>
                            <p className="card-text">
                              {product?.description?.substring(0, 30)}
                            </p>
                            <p className="card-text text-success fw-bold">
                              ${product?.price}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <button
                            className="btn btn-danger  rounded-0"
                            onClick={() => removeProduct(product?._id)}
                          >
                            Remove Product
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center my-5">
                    <h4>Your cart is empty.</h4>
                    <p>Add products to your cart.</p>
                  </div>
                )}
              </div>
              <div className="col-lg-4 text-center">
                <div className="total">
                  <h2 className="text-center mb-2 ">Cart Summary</h2>
                  <p className="fs-5">Payment|CheckOut|Payment</p>
                  <hr className="border border-dark" />
                  <p className="fw-bolder ">Total: {totalPrice()}</p>
                </div>
                <div className="address hr">
                  {auth?.user?.address ? (
                    <>
                      <h2 className="text-center mb-2 ">Your Address</h2>
                      <p className="">{auth?.user?.address}</p>
                      <hr />
                      <button
                        className="btn btn-danger  rounded-0"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        {auth.token ? (
                          <>
                            <button
                              className="btn btn-outline-warning  rounded-0"
                              onClick={() =>
                                navigate("/dashboard/user/profile")
                              }
                            >
                              Update Address
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-outline-warning rounded-0"
                              onClick={() =>
                                navigate("/auth/login", {
                                  state: "/cart",
                                })
                              }
                            >
                              Login to checkOut
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="Btn"
                    onClick={handlePayments}
                    // style={{ width: "12rem" }}
                    disabled={!loading || !instance || !auth?.user?.address}
                  >
                    {!loading ? (
                      <>
                        {" "}
                        <div
                          class="spinner-grow text-white spinner-grow-sm"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        Pay
                        <BsFillCreditCardFill className="svgIcon" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

export default CartPage;
