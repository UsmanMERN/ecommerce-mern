import React from "react";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import { useAuthContext } from "../../../context/AuthContext";

function Admin() {
  const { auth } = useAuthContext();
  const user = auth.user;
  return (
    <>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-3 my-2 text-center">
            <h2>Admin Panel</h2>
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Admin Details</h2>
            <div className="card text-center">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
