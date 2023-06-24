import React from "react";
import Register from "./Register";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Register - E-commerce app trendBlend"
        description="Register an account at TrendBlend to access exclusive features, personalized recommendations, and seamless shopping experience. Sign up now and stay updated with the latest trends in fashion apparel, accessories, and home decor."
        keyword="E-commerce web app, register, sign up, fashion, accessories, home decor, personalized recommendations"
        author="Usman"
      >
        <Register />
      </Layout>
    </>
  );
}

export default index;
