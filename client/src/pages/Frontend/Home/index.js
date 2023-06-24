import React from "react";
import Home from "./Home";
import Layout from "../../../components/Frontend/Layout";
// const LazyLoadHome = React.lazy(import("../"))

function index() {
  return (
    <>
      <Layout
        title="TrendBlend - E-commerce Store for Trendy Fashion and Home Decor"
        description="Welcome to TrendBlend, your go-to destination for trendy fashion apparel, accessories, and home decor. Discover the latest trends and timeless classics carefully curated to elevate your personal style. Shop with us for top-notch quality, exceptional customer service, and an enjoyable shopping experience."
        keyword="E-commerce web app, trendy fashion, home decor, shopping, online store, clothing, accessories, lifestyle, interior design"
        author="Usman"
      >
        <Home />
      </Layout>
    </>
  );
}

export default index;
