import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <div className="list-group d-flex justify-content-center align-items-center text-center card rounded-0 border-1">
      <NavLink
        to="/dashboard/admin/manage-category"
        className="list-group-item list-group-item-action"
      >
        Manage Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/products"
        className="list-group-item list-group-item-action"
      >
        Manage Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="list-group-item list-group-item-action"
      >
        Create Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/users"
        className="list-group-item list-group-item-action"
      >
        Users
      </NavLink>
      <NavLink
        to="/dashboard/admin/order"
        className="list-group-item list-group-item-action"
      >
        Order
      </NavLink>
    </div>
  );
}
