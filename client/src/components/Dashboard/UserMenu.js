import React from "react";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group d-flex justify-content-center align-items-center text-center card rounded-0 border-1">
          <h2 className="text-center">Dashboard</h2>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}
