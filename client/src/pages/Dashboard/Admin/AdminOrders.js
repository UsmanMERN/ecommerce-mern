import React, { useState, useEffect } from "react";
import Layout from "../../../components/Frontend/Layout";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import { Select } from "antd";
import { PORT } from "../../../index";
import axios from "axios";
import moment from "moment";
export default function AdminOrders() {
  const { Option } = Select;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState([
    "not process",
    "processing",
    "shipped",
    "delivered",
  ]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/auth/get-allOrders`);
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
  const handelStatusChange = async (id, value) => {
    try {
      await axios.put(`${PORT}/api/v1/auth/update-status/${id}`, {
        status: value,
      });
      getOrders();
      window.showToast("status updated successfully", "success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout
        title="Admin Orders - TrendBlend E-commerce"
        description="Manage and track all orders on TrendBlend. Stay updated on order status, payment details, and delivery information. Streamline your order management process and ensure smooth operations for your e-commerce business."
        keywords="admin orders, order management, order tracking, order status, payment details, delivery information, e-commerce business, TrendBlend"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 text-center my-2">
              <h2>Admin Panel</h2>
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2 className="text-center">All Orders</h2>
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
                        <div key={order._id}>
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
                                  <td>
                                    <Select
                                      defaultValue={order?.status}
                                      style={{
                                        width: 120,
                                      }}
                                      onChange={(value) =>
                                        handelStatusChange(order._id, value)
                                      }
                                      bordered={false}
                                    >
                                      {status.map((s, i) => {
                                        return (
                                          <Option key={i} value={s}>
                                            {s}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  </td>
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
                        </div>
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
