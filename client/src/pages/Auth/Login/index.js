import React from "react";
import Login from "./Login";
import Layout from "../../../components/Frontend/Layout";

function index() {
  return (
    <>
      <Layout
        title="Login - E-commerce app trendBlend"
        description="Log in to your TrendBlend account to access your profile, view your order history, and manage your preferences. Experience a seamless shopping journey with personalized recommendations and a secure login process."
        keyword="E-commerce web app, login, sign in, user account, order history, personalized recommendations"
        author="Usman"
      >
        <Login />
      </Layout>
    </>
  );
}

export default index;
