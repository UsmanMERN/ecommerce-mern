import React from "react";
import Policy from "./Policy";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Policy - E-commerce app trendBlend"
        description="Read our policy to understand our terms and conditions, privacy practices, and returns and refunds policy. At TrendBlend, we strive to provide a transparent and secure shopping experience for our customers."
        keyword="E-commerce web app, policy, terms and conditions, privacy, returns and refunds"
        author="Usman"
      >
        <Policy />
      </Layout>
    </>
  );
}

export default index;
