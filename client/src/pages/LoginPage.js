import React, { useState } from "react";
import TextField from "../components/tasklist/modal/TextField";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

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
            Login
          </div>
        </div>
        <div>
          <TextField caption="Email" text={email} onTextChange={setEmail} />
          <TextField
            caption="Password"
            text={password}
            type="password"
            onTextChange={setPassword}
          />
        </div>
        <div className="task-modal-delete-container">
          <button className="task-modal-save" onClick={() => auth.login(email, password)}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
