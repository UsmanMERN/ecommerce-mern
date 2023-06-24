import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillShopping } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { Dropdown, Menu } from "antd";
import logo from "../../assets/images/WebsiteLogo.png";
import { useAuthContext } from "../../context/AuthContext";
import SearchForm from "./SearchFoam";
import useCategory from "../../hook/useCategory";
import { useCartContext } from "../../context/cartContext";

function Header() {
  const { auth, setAuth } = useAuthContext();
  const [cart] = useCartContext();
  const category = useCategory();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({
      user: null,
      token: "",
    });
    navigate("/auth/login");
    window.showToast("Logged out successfully", "success");
  };

  const menu = (
    <Menu>
      {category &&
        category.map((cat) => (
          <Menu.Item key={cat._id}>
            <Link to={`/category/${cat?.slug}`} className="nav-link">
              {cat.name}
            </Link>
          </Menu.Item>
        ))}
    </Menu>
  );

  return (
    <header className="fixed-top w-100 position-relative">
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="Logo" className="img img-fluid" />
          </Link>
          <button
            className="navbar-toggler border-0 shadow-lg"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <HiOutlineMenuAlt1 className="fs-4" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex align-items-center ms-auto">
              <SearchForm />
            </div>
            <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
              <motion.li
                className="nav-item mx-2"
                whileHover={{ scale: 0.97, rotate: 2 }}
                whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <NavLink className="nav-link" aria-current="page" to={"/"}>
                  Home
                </NavLink>
              </motion.li>
              <motion.li
                className="nav-item mx-2"
                whileHover={{ scale: 0.97, rotate: 2 }}
                whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <NavLink className="nav-link" to={"/about"}>
                  About
                </NavLink>
              </motion.li>
              <motion.li
                className="nav-item mx-2"
                whileHover={{ scale: 0.97, rotate: 2 }}
                whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <NavLink className="nav-link" to={"/contact"}>
                  Contact
                </NavLink>
              </motion.li>

              <Dropdown overlay={menu} placement="bottomLeft" arrow>
                <motion.li whileHover={{ scale: 0.97 }} className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Categories
                  </Link>
                </motion.li>
              </Dropdown>
              {!auth.user ? (
                <motion.li
                  className="nav-item mx-2 d-flex justify-content-center align-items-center"
                  whileHover={{ scale: 0.97, rotate: 2 }}
                  whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <NavLink className="nav-link" to={"/auth/login"}>
                    Login
                  </NavLink>
                </motion.li>
              ) : (
                <motion.li
                  className="nav-item"
                  whileHover={{ scale: 0.97, rotate: 2 }}
                  whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <div className="dropdown-center">
                    <button
                      className="btn btn-secondary btn-sm dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ minWidth: "8rem" }}
                    >
                      {auth?.user.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <p
                          className="nav-link mb-0"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.li>
              )}
              <motion.li
                className="nav-item mx-2 mt-3 mt-lg-0"
                whileHover={{ scale: 0.97, rotate: 2 }}
                whileTap={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <NavLink className="nav-link position-relative" to={"/cart"}>
                  <AiFillShopping className="fs-4 text-secondary" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </motion.li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
