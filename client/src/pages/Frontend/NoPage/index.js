import React from "react";
import NoPage from "./NoPage";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Page Not Found - E-commerce app trendBlend"
        description="Oops! The page you are looking for does not exist. Please check the URL or navigate back to our website's homepage. Explore our trendy fashion apparel, accessories, and home decor items at TrendBlend."
        keyword="E-commerce web app, page not found, 404 error, fashion, accessories, home decor"
        author="Usman"
      >
        <NoPage />
      </Layout>
    </>
  );
}

export default index;
