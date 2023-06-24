import React, { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../index";
import AdminMenu from "../../../components/Dashboard/AdminMenu";
import Layout from "../../../components/Frontend/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${PORT}/api/v1/auth/all-users`);
      setUsers(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"user trend blend"}>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-3 text-center my-2">
            <h2>Admin Panel</h2>
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>All Users</h2>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="text-center loader"></div>
              </div>
            ) : (
              <>
                {users.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, i) => (
                          <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address.substring(0, 40)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No users found.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
