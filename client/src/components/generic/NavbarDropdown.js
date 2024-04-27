import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
        backgroundColor: "red",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
      }}
      className="text-color"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "90%",
            height: "150px",
            backgroundColor: "green",
            borderRadius: "5px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={auth.user.img}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>
              {auth.user.name}
            </div>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "14px" }}>
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
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "36px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "blue",
              borderRadius: "5px",
            }}
            onClick={() => {
              onClickOutside();
              navigate(`/user/${auth.user.username}`);
            }}
          >
            <span style={{ marginLeft: "10px" }}>Profile</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "36px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "blue",
              borderRadius: "5px",
            }}
          >
            <span style={{ marginLeft: "10px" }}>Account Settings</span>
          </div>
        </div>
        <hr style={{ width: "89%", color: "purple" }}></hr>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "36px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "blue",
              borderRadius: "5px",
            }}
            onClick={() => {
              onClickOutside();
              auth.logout();
            }}
          >
            <span style={{ marginLeft: "10px" }}>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDropdown;
