import React, { Fragment, useEffect, useState } from "react";
import UserMenu from "../../../components/Dashboard/UserMenu";
import Layout from "../../../components/Frontend/Layout";
import { PORT } from "../../../index";
import axios from "axios";
import moment from "moment";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/auth/orders`);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch orders. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Layout
        title="Your Orders Dashboard - TrendBlend E-commerce"
        description="Welcome to the TrendBlend Dashboard! Here, you can manage your e-commerce store with ease. Stay updated on your store's performance, handle orders, manage products, and more. Experience the power and convenience of the TrendBlend Dashboard and take your e-commerce business to new heights."
        keyword="E-commerce dashboard, manage store, order management, product management, business performance"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 my-2 text-center">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center mb-4">Orders</h2>

              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="text-center loader"></div>
                </div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : (
                <>
                  {orders.length === 0 ? (
                    <div className="text-center">No orders found.</div>
                  ) : (
                    <>
                      {orders.map((order) => (
                        <Fragment key={order._id}>
                          <div className="table-responsive">
                            <table className="table table-striped shadow">
                              <thead>
                                <tr>
                                  <th>Buyer</th>
                                  <th>Product Count</th>
                                  <th>Status</th>
                                  <th>Payment Status</th>
                                  <th>Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{order.buyer.name}</td>
                                  <td>{order.product?.length}</td>
                                  <td>{order.status}</td>
                                  <td>
                                    {order.payment.success
                                      ? "Success"
                                      : "Failed"}
                                  </td>
                                  <td>{moment(order.createdAt).fromNow()}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="container">
                            {order.product?.map((product) => (
                              <div className="card mb-4" key={product._id}>
                                <div className="row g-0">
                                  <div className="col-sm-4">
                                    <img
                                      src={`${PORT}/api/v1/product/get-photo/${product._id}`}
                                      alt={product.name}
                                      className="card-img"
                                    />
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {product.name}
                                      </h5>
                                      <p className="card-text">
                                        {product.description.substring(0, 20)}
                                      </p>
                                      <p className="card-text">
                                        ${product.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Orders;
