import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal } from "antd";
import { PORT } from "../../../index";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import Layout from "../../../components/Frontend/Layout";
import CategoryForm from "../../../components/Dashboard/CategoryFoam";

function ManageCategory() {
  const [categories, setCategories] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  // antd design modal   ===>  update category name
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const showModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
  const handleOk = (e) => {
    setIsModalOpen(false);
    handleSubmit(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    showModal(category);
  };

  const handleDelete = async (category) => {
    try {
      const { data } = await axios.delete(
        `${PORT}/api/v1/category/delete-category/${category._id}`,
        selectedCategory
      );
      // .then((res) => console.log("res", res));
      const updatedCategories = categories.filter((cate) => {
        return cate._id !== category._id;
      });
      setCategories(updatedCategories);
      getAllCategories();
      return window.showToast(data.message, "success");
    } catch (error) {
      console.error(error);
      return window.showToast(
        "Something went wrong while getting categories",
        "error"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${PORT}/api/v1/category/update-category/${selectedCategory._id}`,
        selectedCategory
      );
      getAllCategories();
      return window.showToast(
        `${selectedCategory.name} ${data.message}`,
        "success"
      );
    } catch (error) {
      console.error(error);
      window.showToast(
        "Something went wrong while getting categories",
        "error"
      );
    }
  };

  return (
    <>
      <Layout
        title="Manage Categories - Admin Panel | TrendBlend"
        description="Manage your categories in the admin panel of TrendBlend. Add, edit, and delete categories to organize your products effectively. Keep your store well-structured and user-friendly."
        keywords="admin panel, manage categories, category management, product categories, TrendBlend, e-commerce"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 text-center my-2">
              <h2>Admin Panel</h2>
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="row justify-content-between align-items-center mb-4">
                <div className="col-6">
                  <h2 className="text-center">Manage Categories</h2>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Add New Category
                  </button>
                </div>
              </div>
              <div className="w-lg-75 w-100" style={{ minHeight: "70vh" }}>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories.map((category, index) => (
                      <tr key={index}>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(category)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(category)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Pagination
                  current={currentPage}
                  total={categories.length}
                  pageSize={categoriesPerPage}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* ant design model to update the data */}
      <Modal
        title="Edit Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={selectedCategory ? selectedCategory.name : ""}
              onChange={(event) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: event.target.value,
                })
              }
              placeholder="Enter the new Name of category"
            />
          </div>
        </form>
      </Modal>

      {/* Model to create New category */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <CategoryForm getAllCategories={getAllCategories} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageCategory;
