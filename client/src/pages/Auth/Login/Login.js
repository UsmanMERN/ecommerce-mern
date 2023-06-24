import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PORT } from "../../../index";
import { useAuthContext } from "../../../context/AuthContext";
const initialState = {
  email: "",
  password: "",
};

function Login() {
  const { auth, setAuth } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return window.showToast("Fill the input carefully", "error");
    } else {
      try {
        const res = await axios.post(`${PORT}/api/v1/auth/login`, {
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", JSON.stringify(res.data));
          setAuth({
            ...auth,
            token: res.data.token,
            user: res.data.user,
          });
          setFormData(initialState);
          navigate(location.state || "/");
          return window.showToast(res.data.message, "success");
        } else {
          return window.showToast(res.data.message, "error");
        }
      } catch (error) {
        console.error(error);
        return window.showToast("something went wrong", "error");
      }
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            <div className="card shadow border-0 rounded-lg px-3">
              <div className="card-body p-4">
                <div className="text-center">
                  <h1 className="fs-4 fw-bold mb-4">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
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
                    <div className="col-8 text-center">
                      <Link className=" text-danger" to={"/auth/register"}>
                        Don't have Account
                      </Link>
                      {/* <br className=" my-2" /> */}
                      <p className="mb-0 fw-bold fs-4 inline-block">OR</p>
                      <Link
                        className=" text-danger ms-2"
                        to={"/auth/forgetPassword"}
                      >
                        Forget Password
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

export default Login;
