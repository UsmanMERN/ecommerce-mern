import React from "react";
import Header from "./Header";
import Footer from "./Footer";

// react helmet
import { Helmet } from "react-helmet";

function Layout({ children, title, description, keyword, author }) {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Trend Blend E-commerce store",
  description:
    "TrendBlend is an innovative and stylish e-commerce store that brings together the latest trends and timeless classics. Our store offers a curated selection of fashion apparel, accessories, and home decor items that are carefully chosen to blend seamlessly with your unique style. We believe in delivering top-notch quality, exceptional customer service, and an enjoyable shopping experience. Explore our collection at TrendBlend and discover the perfect blend of trends that will elevate your personal style.",
  keyword:
    "E-commerce web app, buy products, trendy fashion, home decor, online store, clothing, accessories, lifestyle, interior design",
  author: "Muhammad Usman",
};

export default Layout;
