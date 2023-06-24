import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ScreenLoader({ state = "/auth/login" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);
    if (count === 0) {
      navigate(`${state}`, {
        state: location.pathname,
      });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location.pathname, state]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h2>Navigating you in {count} seconds</h2>
        <div className="loader"></div>
      </div>
    </>
  );
}

export default ScreenLoader;
