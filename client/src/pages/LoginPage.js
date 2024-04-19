import React, { useState } from "react";
import TextField from "../components/tasklist/modal/TextField";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const base64Credentials = btoa(`${email}:${password}`);
    await fetch("http://localhost:3000/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
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
          <button className="task-modal-save" onClick={() => login()}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
