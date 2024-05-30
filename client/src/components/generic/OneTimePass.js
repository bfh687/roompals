import React, { useRef, useState } from "react";
import AnimationButton from "../../pages/AnimationButton";
import { useNavigate } from "react-router-dom";

const OneTimePass = () => {
  const [oneTimePass, setOneTimePass] = useState(new Array(6).fill(""));
  const oneTimePassRef = useRef([]);

  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const validateOneTimePass = async () => {
    const otp = oneTimePass.join("");

    await fetch("http://localhost:3000/api/auth/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp: otp }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          navigate("/taskdashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOneTimePass = async (value, index) => {
    let numericValue = value.replace(/\D/g, "");

    if (numericValue && numericValue.length > 1) {
      numericValue = numericValue.charAt(numericValue.length - 1);
    }

    const newOneTimePass = [...oneTimePass];
    newOneTimePass[index] = numericValue;
    setOneTimePass(newOneTimePass);

    if (numericValue) {
      if (index < 5) {
        oneTimePassRef.current[index + 1].focus();
      } else {
        oneTimePassRef.current[index].blur();
      }
    }
  };

  const handleSpecialKeys = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      oneTimePassRef.current[index - 1].focus();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontWeight: "400",
            fontSize: "42px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          Verify Your Identity
        </div>
        <div style={{ fontWeight: "350", paddingBottom: "12px" }}>
          Check your email for the one-time password
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "12px" }}>
        {oneTimePass.map((digit, index) => {
          console.log(oneTimePass);
          return (
            <input
              style={{
                margin: "5px",
                textAlign: "center",
                height: "32px",
                width: "22px",
                fontSize: "x-large",
              }}
              key={index}
              className="text-color text-input"
              onInput={(e) => updateOneTimePass(e.target.value, index)}
              onKeyDown={(e) => handleSpecialKeys(e, index)}
              ref={(ref) => (oneTimePassRef.current[index] = ref)}
              value={digit}
            />
          );
        })}
      </div>
      <div style={{ width: "328px", marginTop: "24px" }}>
        <button
          className="form-button"
          onClick={() => validateOneTimePass()}
          ref={buttonRef}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default OneTimePass;
