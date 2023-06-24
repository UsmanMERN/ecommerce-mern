import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";

// PORT
import { PORT } from "../../../index";
// components
import Layout from "../../../components/Frontend/Layout";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import { useNavigate } from "react-router-dom";
// initial state '='
const initialState = {
  name: "",
  description: "",
  price: "",
  quantity: "",
};
export default function ManageProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [singleCategory, setSingleCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
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

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // create product
  const handleSubmit = async (e) => {
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
      const { data } = await axios.post(
        `${PORT}/api/v1/product/create-product`,
        formDataToSend
      );
      if (data?.success) {
        window.showToast(data?.message, "success");
        return navigate("/dashboard/admin/products");
      } else {
        return window.showToast(data?.message, "error");
      }
    } catch (error) {
      console.error(error);
      window.showToast("someThing went wrong", "error");
    }
  };
  return (
    <>
      <Layout
        title="Create Products - Admin Panel | TrendBlend"
        description="Create new products in the admin panel of TrendBlend. Add detailed information including name, description, price, quantity, category, and shipping options. Expand your product inventory and offer a wider selection to your customers."
        keywords="admin panel, create products, product creation, inventory management, TrendBlend, e-commerce"
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
                <h2 className="text-center">Create Products</h2>
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
                    {photo && (
                      <div className="card">
                        <img
                          src={URL.createObjectURL(photo)}
                          className="img img-fluid img-responsive"
                          alt={`${photo.name}`}
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
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
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
                    <div className="mb-3 d-flex justify-content-center">
                      <button
                        className="btn btn-primary rounded-0 w-50"
                        onClick={handleSubmit}
                      >
                        CREATE PRODUCT
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
