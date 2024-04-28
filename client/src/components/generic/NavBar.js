import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import NavbarDropdown from "./NavbarDropdown";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [showNavbarDropdown, setShowNavbarDropdown] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#141616",
        height: "40px",
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="text-color"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "3px",
            paddingLeft: "24px",
            paddingRight: "24px",
            height: "100%",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          room
          <span style={{ color: "#469d86", fontWeight: "bold" }}>pals</span>
        </div>
      </div>
      {auth.user && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              cursor: "pointer",
              padding: "0px 10px",
              marginBottom: "1px",
              fontSize: "small",
            }}
            onClick={() => navigate("/taskdashboard")}
          >
            Dashboard
          </div>
          <div>
            <button
              style={{
                cursor: "pointer",
                height: "35px",
                display: "flex",
                marginRight: "5px",
                background: "none",
                border: "none",
              }}
              onClick={() => setShowNavbarDropdown(!showNavbarDropdown)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={auth.user.img}
                    style={{ height: "30px", width: "30px", borderRadius: "50%" }}
                  />
                </div>
                <div style={{ padding: "0px 0px 0px 5px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "18px", height: "18px", marginTop: "5px" }}
                    className="text-color"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            </button>
            {showNavbarDropdown && (
              <NavbarDropdown onClickOutside={() => setShowNavbarDropdown(false)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
