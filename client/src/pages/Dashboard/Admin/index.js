import React from "react";
import Layout from "../../../components/Frontend/Layout";
import Admin from "./Admin";

function Index() {
  return (
    <>
      <Layout
        title="Admin Dashboard - TrendBlend E-commerce"
        description="Manage your e-commerce store with ease using the TrendBlend Admin Dashboard. Access powerful features to handle products, orders, customers, and more. Stay in control and streamline your e-commerce operations. Discover the convenience and efficiency of the TrendBlend Admin Dashboard."
        keyword="E-commerce admin panel, dashboard, manage products, orders, customers, e-commerce operations"
        author="Usman"
      >
        <Admin />
      </Layout>
    </>
  );
}

export default Index;
