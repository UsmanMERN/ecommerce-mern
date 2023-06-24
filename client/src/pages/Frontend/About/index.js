import React from "react";
import Layout from "../../../components/Frontend/Layout";
import About from "./About";

function index() {
  return (
    <>
      <Layout
        title="About TrendBlend - E-commerce App"
        description="TrendBlend is an innovative and stylish e-commerce store that brings together the latest trends and timeless classics. Our store offers a curated selection of fashion apparel, accessories, and home decor items that are carefully chosen to blend seamlessly with your unique style. We believe in delivering top-notch quality, exceptional customer service, and an enjoyable shopping experience. Explore our collection at TrendBlend and discover the perfect blend of trends that will elevate your personal style."
        keyword="E-commerce web app, buy products, trendy fashion, home decor, online store, fashion apparel, accessories, shopping"
        author="Usman"
      >
        <About />
      </Layout>
    </>
  );
}

export default index;
