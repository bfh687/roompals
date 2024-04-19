import React, { useEffect } from "react";
import NavBar from "../components/generic/NavBar";
import Footer from "../components/generic/Footer";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return;
    const verify = async () => {
      await fetch("http://localhost:3000/api/token/verify", {
        method: "POST",
      })
        .then((res) => {
          const url = window.location.pathname;
          if (!res.ok && (url !== "/login" || url !== "/register")) {
            navigate("/login");
          } else if (res.ok && (url === "/login" || url === "/register")) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    verify();
  }, [location.pathname]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
