/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";

// PORT
import { PORT } from "../../../index";
// components
import Layout from "../../../components/Frontend/Layout";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
// initial state '='
const initialState = {
  name: "",
  description: "",
  price: "",
  quantity: "",
};
export default function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [singleCategory, setSingleCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [formData, setFormData] = useState(initialState);
  // fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      window.showToast(
        "Something went wrong while getting categories",
        "error"
      );
    }
  };

  // getSingle product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${PORT}/api/v1/product/get-product/${params?.slug}`
      );

      if (data?.success) {
        const productData = data?.product;
        // console.log(productData._id);
        setFormData({
          name: productData?.name,
          description: productData?.description,
          price: productData?.price,
          quantity: productData?.quantity,
        });
        setId(productData._id);
        setSingleCategory(productData.category);
        setShipping(productData.shipping);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    getAllCategories();
  }, []);
  //   handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(Id);
  // create product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, description, price, quantity } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("description", description);
    formDataToSend.append("price", price);
    formDataToSend.append("quantity", quantity);
    formDataToSend.append("category", singleCategory);
    formDataToSend.append("shipping", shipping);
    if (photo) {
      formDataToSend.append("photo", photo);
    }
    try {
      const response = await axios.put(
        `${PORT}/api/v1/product/update-product/${id}`,
        formDataToSend
      );
      const { data } = response;
      if (data?.success) {
        window.showToast(data?.message, "success");
        navigate("/dashboard/admin/products");
      } else {
        window.showToast(data?.message, "error");
      }
    } catch (error) {
      console.error(error);
      window.showToast("Something went wrong", "error");
    }
  };

  const handleDelete = async () => {
    let answer = window.prompt("Are you sure to delete this product ? ");
    if (!answer) {
      return;
    }
    try {
      await axios.delete(`${PORT}/api/v1/product/delete-product/${id}`);
      window.showToast("Product Deleted", "done");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error(error);
      window.showToast("Something went wrong", "error");
    }
  };
  return (
    <>
      <Layout
        title="Update Product - Admin Panel | TrendBlend"
        description="Update a product in the admin panel of TrendBlend. Modify the product details, including name, description, price, quantity, category, and shipping information."
        keywords="admin panel, update product, product management, product modification, TrendBlend, e-commerce"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 text-center my-2">
              <h2>Admin Panel</h2>
              <AdminMenu />
            </div>
            <div className="col-md-9">
              {/* Section: Manage Products */}
              <div className="row mb-2">
                <h2 className="text-center">Update Products</h2>
              </div>
              {/* Section: Upload Photo */}
              <div className="col-md-8 offset-md-2 col-12">
                <div className="card py-3 px-3">
                  <div className="mb-3">
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      className="py-1"
                      direction="vertical"
                      placeholder="Select a category"
                      optionFilterProp="children"
                      onChange={(v) => {
                        setSingleCategory(v);
                      }}
                      options={
                        categories &&
                        categories.map((category) => ({
                          id: category?.name,
                          value: category?._id,
                          label: category?.name,
                        }))
                      }
                      value={singleCategory?.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="w-100 btn btn-outline-primary">
                      {/* {!photo ? <AiOutlineUpload /> : photo.name} */}
                      <input
                        type="file"
                        // className="form-control col-12"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    {photo ? (
                      <div className="card">
                        <img
                          src={URL.createObjectURL(photo)}
                          className="img img-fluid img-responsive"
                          alt={`${photo.name}`}
                          style={{ height: "250px" }}
                        />
                      </div>
                    ) : (
                      <div className="card">
                        <img
                          src={`${PORT}/api/v1/product/get-photo/${id}`}
                          className="img img-fluid img-responsive"
                          alt={`${"oo yeah"}`}
                          style={{ height: "250px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="row my-3">
                    <div className="mb-3">
                      {" "}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        value={formData.description}
                        name="description"
                        id=""
                        cols="30"
                        className="form-control"
                        rows="3"
                        onChange={handleChange}
                        placeholder="write a description"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        value={formData.price}
                        className="form-control"
                        name="price"
                        placeholder="write a price"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        placeholder="write a quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        className="py-1"
                        direction="vertical"
                        placeholder="Select a shipping"
                        optionFilterProp="children"
                        onChange={(v) => setShipping(v)}
                        value={shipping}
                        options={[
                          {
                            label: "No",
                            value: "0",
                          },
                          {
                            label: "Yes",
                            value: "1",
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-3 d-flex justify-content-around">
                      <button
                        className="btn btn-primary rounded-0 w-25"
                        onClick={handleUpdate}
                      >
                        UPDATE PRODUCT
                      </button>
                      <button
                        className="btn btn-danger rounded-0 w-25"
                        onClick={handleDelete}
                      >
                        DELETE PRODUCT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
