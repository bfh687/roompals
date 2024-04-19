import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#141616",
        height: "45px",
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
          }}
        >
          room
          <span style={{ color: "#469d86", fontWeight: "bold" }}>pals</span>
        </div>
        <div style={{ height: "100%" }}>
          <ul
            id="nav"
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <li
              style={{
                boxSizing: "border-box",
                height: "100%",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <a
                style={{
                  fontSize: "small",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Tasks
              </a>
              <ul
                style={{
                  padding: "10px",
                  fontSize: "small",
                  backgroundColor: "#141616",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <li>
                  <a style={{ cursor: "pointer", paddingBottom: "5px" }}>Personal</a>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }}>Shared</a>
                </li>
              </ul>
            </li>
            <li
              style={{
                boxSizing: "border-box",
                height: "100%",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <a
                style={{
                  fontSize: "small",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Financial
              </a>
              <ul
                style={{
                  padding: "10px",
                  fontSize: "small",
                  backgroundColor: "#141616",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <li>
                  <a style={{ cursor: "pointer", paddingBottom: "5px" }}>Personal</a>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }}>Shared</a>
                </li>
              </ul>
            </li>
            <li
              style={{
                boxSizing: "border-box",
                height: "100%",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            >
              <a
                style={{
                  fontSize: "small",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Rewards
              </a>
              <ul
                style={{
                  padding: "10px",
                  fontSize: "small",
                  backgroundColor: "#141616",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <li>
                  <a style={{ cursor: "pointer", paddingBottom: "5px" }}>Personal</a>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }}>Shared</a>
                </li>
              </ul>
            </li>
            <li
              style={{
                boxSizing: "border-box",
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <a
                style={{
                  fontSize: "small",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Pals
              </a>
              <ul
                style={{
                  padding: "10px",
                  fontSize: "small",
                  backgroundColor: "#141616",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <li>
                  <a style={{ cursor: "pointer", paddingBottom: "5px" }}>Personal</a>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }}>Shared</a>
                </li>
              </ul>
            </li>
            <li
              style={{
                boxSizing: "border-box",
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <a
                style={{
                  fontSize: "small",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Help
              </a>
              <ul
                style={{
                  padding: "10px",
                  fontSize: "small",
                  backgroundColor: "#141616",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                <li>
                  <a style={{ cursor: "pointer", paddingBottom: "5px" }}>Personal</a>
                </li>
                <li>
                  <a style={{ cursor: "pointer" }}>Shared</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "5px", cursor: "pointer" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "24px", height: "24px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            fetch("/api/signout", {
              method: "POST",
            })
              .then((res) => {
                if (res.ok) {
                  navigate("/login");
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          Log out
        </div>
      </div>
    </div>
  );
};

export default NavBar;
