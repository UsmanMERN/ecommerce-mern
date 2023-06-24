import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { PORT } from "../index";
import { Outlet } from "react-router-dom";
import ScreenLoader from "../components/Frontend/ScreenLoader";
function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuthContext();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${PORT}/api/v1/auth/auth-admin`);
      if (res.data.success) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <ScreenLoader state="/" />;
}

export default AdminRoute;
