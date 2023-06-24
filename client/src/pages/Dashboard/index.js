import React from "react";
import { Route, Routes } from "react-router-dom";

// components
import Private from "../../private/Private";
import AdminRoute from "../../private/AdminRoute";
import Admin from "./Admin";

// pages
import DashboardHome from "./User/DashboardHome";
import CreateProduct from "./Admin/CreateProduct";
import Users from "./Admin/Users";
import Profile from "./User/Profile";
import Orders from "./User/Order";
import ManageCategory from "./Admin/ManageCategory";
import ManageProduct from "./Admin/ManageProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import AdminOrders from "./Admin/AdminOrders";

function Index() {
  return (
    <>
      <Routes>
        <Route path="/user" element={<Private />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/orders" element={<Orders />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="" element={<Admin />} />
          <Route path="/admin/manage-category" element={<ManageCategory />} />
          <Route path="/admin/products" element={<ManageProduct />} />
          <Route path="/admin/update/:slug" element={<UpdateProduct />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/order" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default Index;
