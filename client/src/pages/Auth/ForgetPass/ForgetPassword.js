import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PORT } from "../../../index";
const initialState = {
  email: "",
  answer: "",
  newPassword: "",
};
function ForgetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, answer, newPassword } = formData;
    setLoading(true);
    if (!validateEmail(email)) {
      window.showToast(emailError, "error");
      setLoading(false);
      return setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    if (!validatePassword(newPassword)) {
      alert(
        "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters.",
        "error"
      );
      setLoading(false);
      return setPasswordError(
        "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters."
      );
    } else {
      setPasswordError("");
    }
    if (answer.length < 4) {
      setLoading(false);
      return window.showToast("Enter a answer which is 4 words", "error");
    }
    try {
      setLoading(false);
      await axios.post(`${PORT}/api/v1/auth/forgot-password`, formData);
      window.showToast("Reset password link sent to your mail.", "success");

      return navigate("/auth/login");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          <div className="card shadow border-0 rounded-lg px-3">
            <div className="card-body p-4">
              <div className="text-center">
                <h1 className="fs-4 fw-bold mb-4">Forget Password</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {emailError && (
                    <div className="invalid-feedback">{emailError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Answer</label>
                  <input
                    type="text"
                    className={`form-control`}
                    placeholder="what is Your favorite food"
                    value={formData.answer}
                    onChange={handleChange}
                    name="answer"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control`}
                    placeholder="Enter your New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    name="newPassword"
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                </div>
                <div className="row">
                  <div className="col-4">
                    <button
                      type="submit"
                      className="rounded-0 btn btn-outline-secondary"
                      disabled={loading}
                      style={{ width: "12rem" }}
                    >
                      {loading ? "" : "Submit"}
                    </button>
                  </div>
                  <div className="col-8 text-end">
                    <Link className=" text-danger" to={"/auth/login"}>
                      Back to Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
