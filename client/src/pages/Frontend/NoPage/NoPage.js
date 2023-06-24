import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="text-center p-4 rounded bg-white shadow">
        <h1 className="display-4 text-danger ">
          <span className="fw-bold">404</span>
        </h1>
        <p className="lead text-secondary fw-medium">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to={"/"} className="text-decoration-none btn btn-outline-dark">
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default NoPage;
