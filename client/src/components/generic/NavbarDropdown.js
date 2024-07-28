import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GearIcon from "../icons/GearIcon";
import PowerIcon from "../icons/PowerIcon";
import AtSignIcon from "../icons/AtSignIcon";

const NavbarDropdown = ({ onClickOutside }) => {
  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => onClickOutside());

  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: "50px",
        right: "5px",
        minWidth: "280px",
        backgroundColor: "#1b1d1e",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "3px 3px 5px 5px rgba(0, 0, 0, 0.3)",
        zIndex: "9999",
      }}
      className="text-color"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "90%",
            height: "150px",
            backgroundColor: "#1f2222",
            borderRadius: "5px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={auth.user.img ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {auth.user.name}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              {auth.user.username}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <div
            className="navbar-dropdown-item"
            onClick={() => {
              onClickOutside();
              navigate(`/user/${auth.user.username}`);
            }}
          >
            <span
              style={{
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
                marginTop: "1px",
              }}
            >
              <AtSignIcon width={20} height={20} />
            </span>
            <span style={{ marginLeft: "10px" }}>Profile</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            cursor: "pointer",
          }}
        >
          <div className="navbar-dropdown-item">
            <span
              style={{
                marginLeft: "10px",
                marginTop: "1px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <GearIcon width={20} height={20} />
            </span>
            <span style={{ marginLeft: "10px" }}>Account Settings</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <div
            className="navbar-dropdown-item"
            onClick={() => {
              onClickOutside();
              auth.logout();
            }}
          >
            <span
              style={{
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
                marginBottom: "1px",
              }}
            >
              <PowerIcon width={20} height={20} />
            </span>
            <span style={{ marginLeft: "10px" }}>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropdown;
