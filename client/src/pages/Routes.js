import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Lazy-loaded components
const Frontend = lazy(() => import("./Frontend"));
const Auth = lazy(() => import("./Auth"));
const Dashboard = lazy(() => import("./Dashboard"));

function Index() {
  return (
    <>
      {/* Suspense fallback */}
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/*" element={<Frontend />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Suspense>
    </>
  );
}

export default Index;
