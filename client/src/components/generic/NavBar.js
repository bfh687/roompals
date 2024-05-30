import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import NavbarDropdown from "./NavbarDropdown";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../icons/NotificationIcon";
import NotificationDropdown from "./NotficationDropdown";

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [showNavbarDropdown, setShowNavbarDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "40px",
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "8px",
        paddingBottom: "8px",
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
            marginBottom: "3px",
          }}
          className="hoverable"
          onClick={() => navigate("/")}
        >
          room
          <span style={{ color: "#469d86", fontWeight: "bold" }}>pals</span>
        </div>
      </div>
      {auth.user && (
        <div style={{ display: "flex", alignItems: "center", paddingRight: "12px" }}>
          <div
            style={{
              cursor: "pointer",
              padding: "0px 10px",
              marginBottom: "1px",
              marginRight: "8px",
              fontSize: "small",
              fontWeight: "600",
            }}
            className="hoverable-inverse"
            onClick={() => navigate("/taskdashboard")}
          >
            Dashboard
          </div>
          <span
            style={{
              marginRight: "6px",
              marginTop: "3px",
              position: "relative",
            }}
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
          >
            {auth.user?.notifications?.length != 0 && (
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#c32940",
                  position: "absolute",
                  right: "0px",
                  cursor: "pointer",
                }}
              />
            )}
            <span style={{ cursor: "pointer" }} className="hoverable">
              <NotificationIcon width={24} height={24} />
            </span>
          </span>
          <div>
            <button
              style={{
                cursor: "pointer",
                height: "38px",
                display: "flex",
                marginRight: "5px",
                marginBottom: "2px",
                border: "none",
                borderRadius: "3px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              onClick={() => setShowNavbarDropdown(!showNavbarDropdown)}
              className="bg-hoverable"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={auth.user.img}
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div style={{ padding: "0px 0px 0px 8px" }}>
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
            {showNotificationDropdown && (
              <NotificationDropdown onClickOutside={() => setShowNotificationDropdown(false)} />
            )}
          </div>
        </div>
      )}
      {!auth.user && (
        <div style={{ display: "flex", alignItems: "center", paddingRight: "12px" }}>
          <div
            style={{
              cursor: "pointer",
              padding: "0px 10px",
              marginBottom: "1px",
              fontSize: "",
            }}
            className="hoverable"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
          <div
            style={{
              cursor: "pointer",
              padding: "0px 10px",
              marginBottom: "1px",
              fontSize: "",
            }}
            className="hoverable"
            onClick={() => navigate("/register")}
          >
            Register
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
