import React, { useState } from "react";
import UserMenu from "../../../components/Dashboard/UserMenu";
import Layout from "../../../components/Frontend/Layout";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { PORT } from "../../../index";

function Profile() {
  const { auth, setAuth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    name: auth?.user?.name || "",
    email: auth?.user?.email || "",
    password: "",
    address: auth?.user?.address || "",
    phone: auth?.user?.phone || "",
  });

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = updatedProfile;
    try {
      setIsLoading(true);
      const { data } = await axios.put(`${PORT}/api/v1/auth/update-profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data.success) {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = JSON.parse(localStorage.getItem("token"));
        ls.user = data?.updateUser;
        localStorage.setItem("token", JSON.stringify(ls));
        window.showToast(data.msg, "success");
      } else {
        window.showToast(data.msg, "error");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      window.showToast("An error occurred. Please try again.", "error");
    }
  };

  return (
    <>
      <Layout
        title="User Profile - TrendBlend E-commerce"
        description="Manage your user profile on the TrendBlend Dashboard. Update your personal information, manage account settings, and more. Enhance your user experience with the TrendBlend user profile features."
        keyword="User profile, account settings, personal information, TrendBlend Dashboard, user experience"
        author="Usman"
      >
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3 my-2 text-center">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <h2>User Profile</h2>
              <div className="card m-2 p-2">
                <form onSubmit={handleEditProfile}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updatedProfile.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={updatedProfile.email}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={updatedProfile.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={updatedProfile.address}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Additional form fields */}
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={updatedProfile.phone}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary rounded-0 align-self-center"
                    style={{ width: "12rem" }}
                  >
                    {isLoading ? (
                      <div
                        class="spinner-grow text-white spinner-grow-sm"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
