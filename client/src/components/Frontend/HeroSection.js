import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function HeroSection({ heading, page, paragraph, style }) {
  return (
    <div
      className={`container-fluid m-0 background-img ${style} `}
      style={{ height: `${style}` }}
    >
      <div className="row">
        <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center text-center">
          <motion.h1 className="display-4 mb-1 display-6">{heading}</motion.h1>
          <motion.p className="align-self-around fw-light mb-1 fs-4">
            <BiRightArrow />
            {page}
          </motion.p>
          <motion.p className="mb-1 fs-5 fs-md-6">{paragraph}</motion.p>
          <div className="button-group">
            <motion.div
              whileHover={{ scale: 1.03, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to="/contact"
                className="btn btn-danger rounded-0"
                style={{ width: "12rem" }}
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
