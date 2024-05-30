import React from "react";
import NavBar from "../components/generic/NavBar";
import Footer from "../components/generic/Footer";

import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";

const Layout = () => {
  return (
    <AuthProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <NavBar />
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default Layout;
