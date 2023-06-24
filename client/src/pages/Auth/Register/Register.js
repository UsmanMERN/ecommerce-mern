import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PORT } from "../../../index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const initialState = {
  name: "",
  email: "",
  password: "",
  address: "",
  phone: "",
  answer: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const PORT = "http://localhost:8000";

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, address, phone, answer } = formData;

    if (!validatePassword(password)) {
      alert(
        "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters",
        "error"
      );
      return setPasswordError(
        "Password should be at least 8 characters long and contain a combination of letters, numbers, and special characters."
      );
    } else {
      setPasswordError("");
    }
    if (!validateEmail(email)) {
      window.showToast("Email correctly", "error");
      return setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
    if (!phone) {
      window.showToast("Phone number correctly", "error");
      return setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError("");
    }
    if (!name || name.length < 3) {
      return window.showToast("Enter name correctly", "error");
    }
    if (!address || address.length < 8) {
      return window.showToast("Enter address correctly", "error");
    }

    // Validate answer
    if (!answer) {
      return window.showToast("Please provide an answer.", "error");
    }

    try {
      const res = await axios.post(`${PORT}/api/v1/auth/register`, {
        name,
        email,
        password,
        address,
        phone,
        answer,
      });
      if (res.data.success) {
        setFormData(initialState);
        navigate("/auth/login");
        return window.showToast(res.data.message, "success");
      } else {
        return window.showToast(res.data.message, "error");
      }
    } catch (error) {
      console.error(error.message);
      return window.showToast("Something went wrong", "error");
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="card shadow border-0 rounded-lg px-3">
              <div className="card-body p-4">
                <div className="text-center">
                  <h1 className="fs-4 fw-bold mb-4">Register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        emailError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          passwordError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="fs-5 text-dark" />
                        ) : (
                          <AiOutlineEye className="fs-5 text-dark" />
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <div className="invalid-feedback">{passwordError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className={`form-control ${
                        phoneError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {phoneError && (
                      <div className="invalid-feedback">{phoneError}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Answer (use this when you forget password)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your answer"
                      name="answer"
                      value={formData.answer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <button
                        type="submit"
                        className="rounded-0 btn btn-outline-secondary"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-8 text-end">
                      <Link className=" text-danger" to={"/auth/login"}>
                        Already have an account
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
