import React, { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../index";
// components
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import Layout from "../../../components/Frontend/Layout";
import { Link } from "react-router-dom";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/product/get-products`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Layout
        title="Manage Products - Admin Panel | TrendBlend"
        description="Manage your products in the admin panel of TrendBlend. Add, edit, and delete products with ease. Stay organized and keep your inventory up-to-date."
        keywords="admin panel, manage products, product management, inventory management, TrendBlend, e-commerce"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 my-2 text-center">
              <h2>Admin Panel</h2>
              <AdminMenu />
            </div>
            <div className="col-md-9 col-12">
              <h2 className="text-center">Manage Products</h2>
              <div className="container ">
                <div className="row ">
                  {products &&
                    products.map((product) => {
                      return (
                        <div
                          className="col-12 col-sm-8 col-md-6 col-lg-4 my-2"
                          key={product._id}
                        >
                          <Link
                            className="text-decoration-none"
                            to={`/dashboard/admin/update/${product?.slug}`}
                          >
                            <div className="card shadow">
                              <img
                                src={`${PORT}/api/v1/product/get-photo/${product?._id}`}
                                className="card-img-top img-fluid"
                                style={{ height: "215px" }}
                                alt={product?.name}
                              />
                              <div className="card-body">
                                <h5 className="card-title">{product?.name}</h5>
                                <p className="card-text">
                                  {product?.description.substring(0, 60) +
                                    "..."}
                                </p>
                                <div className="d-flex justify-content-around">
                                  <p className="card-text">
                                    Price : {product?.price}
                                  </p>
                                  <p className="card-text">
                                    Quantity : {product?.quantity}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
