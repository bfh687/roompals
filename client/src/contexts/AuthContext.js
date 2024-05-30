import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const verify = async () => {
      await fetch("http://localhost:3000/api/auth/verify", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setUser(res.user);
          const url = window.location.pathname;
          if (
            !res.user &&
            url !== "/login" &&
            url !== "/register" &&
            url !== "/"
          ) {
            navigate("/login");
          } else if (res.user && (url === "/login" || url === "/register")) {
            navigate("/taskdashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
        });
    };

    verify();
  }, [location.pathname]);

  const refresh = () => {
    fetch("http://localhost:3000/api/auth/verify", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
        setUser(null);
      });
  };

  const login = async (email, password) => {
    const base64Credentials = btoa(`${email}:${password}`);
    await fetch("http://localhost:3000/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setUser(res.user);
          navigate("/taskdashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ user, refresh, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
