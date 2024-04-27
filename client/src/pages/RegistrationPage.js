import React, { useState } from "react";
import TextField from "../components/tasklist/modal/TextField";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <div className="task-modal" style={{ marginTop: "150px" }}>
        <div
          className="center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
            className="text-color"
          >
            Register
          </div>
        </div>
        <div>
          <TextField caption="Name" text={name} onTextChange={setName} />
          <TextField caption="Email" text={email} onTextChange={setEmail} />
          <TextField
            caption="Password"
            text={password}
            type="password"
            onTextChange={setPassword}
          />
          <TextField
            caption="Confirm Password"
            text={password}
            type="password"
            onTextChange={setPassword}
          />
        </div>
        <div className="task-modal-delete-container">
          <button className="task-modal-save" onClick={() => register()}>
            Create Account
          </button>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
