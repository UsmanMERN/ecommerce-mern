import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-center text-light py-3"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Follow Us</h2>
            <div className="social-media-links">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="btn btn-outline-primary btn-floating btn-lg m-1"
                href="https://www.facebook.com/profile.php?id=100054508777162"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="btn btn-outline-primary btn-floating btn-lg m-1"
                href="https://twitter.com/musman_47"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="btn btn-outline-primary btn-floating btn-lg m-1"
                href="https://www.instagram.com/musman.47/"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="btn btn-outline-primary btn-floating btn-lg m-1"
                href="https://www.linkedin.com/in/mernstack-developers/"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="btn btn-outline-primary btn-floating btn-lg m-1"
                href="https://github.com/muhammadusman36"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>
          <div className="col-md-8">
            <h2>Quick Links</h2>
            <ul className="list-unstyled d-flex justify-content-center align-items-center text-decoration-none">
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="mb-2 mx-3"
              >
                <Link
                  className="text-decoration-none text-primary fs-5"
                  to="/about"
                >
                  About Us
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="mb-2 mx-3"
              >
                <Link
                  className="text-decoration-none text-primary fs-5"
                  to="/policy"
                >
                  Privacy Policy
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.5 } }}
                className="mb-2 mx-3"
              >
                <Link
                  className="text-decoration-none text-primary fs-5"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p className="mb-0">
              All Rights Reserved &copy; {year} || Developed by Usman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
