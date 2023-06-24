import React from "react";
import Category from "./Category";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Category Page - E-commerce app trendBlend"
        description="Explore a wide range of categories at TrendBlend. Find the latest fashion apparel, accessories, and home decor items in various categories. Discover the perfect products to elevate your personal style and create a trendy living space."
        keyword="E-commerce web app, category page, fashion, accessories, home decor"
        author="Usman"
      >
        <Category />
      </Layout>
    </>
  );
}

export default index;
