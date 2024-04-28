import React, { useState } from "react";
import TextField from "../components/tasklist/modal/TextField";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <div
          className="text-color"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Register
            </div>
            <div className="input-container">
              <input
                type="text"
                id="name"
                autoComplete="off"
                className="text-input text-color"
                placeholder=""
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="text"
                className={`label${name ? " filled" : ""}`}
                style={{ cursor: "text" }}
              >
                Name
              </label>
            </div>
            <div className="input-container" style={{ marginTop: "8px" }}>
              <input
                type="text"
                id="email"
                autoComplete="off"
                className="text-input text-color"
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className={`label${email ? " filled" : ""}`}
                style={{ cursor: "text" }}
              >
                Email address
              </label>
            </div>
            <div className="input-container" style={{ marginTop: "8px" }}>
              <input
                type="password"
                id="username"
                autoComplete="off"
                className="text-input text-color"
                placeholder=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className={`label${password ? " filled" : ""}`}
                style={{ cursor: "text" }}
              >
                Password
              </label>
            </div>
            <div style={{ width: "328px", marginTop: "16px" }}>
              <button
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: "#10a37f",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => register()}
              >
                Continue
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                fontSize: "15px",
              }}
            >
              Already have an account?
              <span
                style={{
                  color: "#469d86",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
