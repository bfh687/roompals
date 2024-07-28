import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import OneTimePass from "../components/generic/OneTimePass";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const register = async () => {
    await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setShowOTP(true);
        } else {
          setError(res.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <div className="text-color" style={{ display: "flex", justifyContent: "center" }}>
          {!showOTP ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "32px",
                  fontWeight: "bold",
                  marginBottom: "36px",
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
                  autoFocus
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
              <div style={{ width: "328px", marginTop: "24px" }}>
                <button
                  className="form-button"
                  style={{
                    display: "flex",
                    height: "46px",
                    justifyContent: "center",
                    alignItems: "center",
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
          ) : (
            <OneTimePass />
          )}
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
