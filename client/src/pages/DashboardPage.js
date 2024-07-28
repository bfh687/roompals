import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PartyHeader from "../components/PartyHeader/PartyHeader";
import TextField from "../components/tasklist/modal/TextField";

const DashboardPage = () => {
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  return (
    <div
      className="text-color"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "24px",
        backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <PartyHeader collapsed />
        {/* <div style={{ fontWeight: "700", fontSize: "18px", marginTop: "8px" }}>
          Create or Join a Party
        </div> */}
        <div
          style={{
            maxWidth: "320px",
            textAlign: "center",
            marginTop: "4px",
            fontWeight: "400",
            fontSize: "12px",
          }}
        >
          To use roompals, you must be in a party. Create a party and invite your roommates, or if
          your roommates already have a party - ask them to invite you!
        </div>
        <div style={{ display: "flex", marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  marginTop: "24px",
                  textAlign: "center",
                }}
              >
                Create a Party
              </div>
              <div style={{ display: "flex", marginTop: "6px", flexDirection: "column" }}>
                <TextField caption="Name" text={name} onTextChange={setName} />
              </div>
            </div>
            <div
              style={{
                width: "160px",
                marginTop: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="form-button"
                style={{
                  display: "flex",
                  height: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Continue
              </button>
            </div>
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "12px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 10px",
            }}
          >
            <i>Or</i>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              Join a Party
            </div>
            <div style={{ display: "flex", marginTop: "6px" }}>
              <TextField caption="Invite Code" text={inviteCode} onTextChange={setInviteCode} />
            </div>
            <div style={{ width: "160px", marginTop: "22px" }}>
              <button
                className="form-button"
                style={{
                  display: "flex",
                  height: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
