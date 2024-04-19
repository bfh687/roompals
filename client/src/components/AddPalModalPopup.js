import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ActiveScreen } from "./generic/ActiveScreen";
import TextField from "./tasklist/modal/TextField";

export const AddPalModalPopup = ({ partyMembers, onClickOutside }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    onClickOutside();
  });

  const [email, setEmail] = useState("");

  const [requests, setRequests] = useState([{}]);

  useEffect(() => {
    setRequests(partyMembers.filter((member) => member.verified === 0));
  }, []);

  const sendPartyRequest = async (username) => {
    await fetch(`http://localhost:3000/api/party/${1}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => res.json())
      .then((res) => {
        const newRequests = [...requests];
        newRequests.push(res);
        setRequests(newRequests);
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div ref={modalRef} className="task-modal text-color">
        <div
          className="center"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "25px 25px 15px 25px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
            className="text-color"
          >
            Add Pals
          </div>
        </div>
        <TextField caption={"Email"} text={email} onTextChange={setEmail} />
        <div
          style={{
            padding: "8px 25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "smaller",
          }}
        >
          If a user is associated with the email, they will be sent an invite request to join your
          pals.
        </div>
        <div style={{ padding: "12px 25px", fontSize: "medium" }}>
          <div>Current Requests</div>
          <div>
            {requests.map((pal, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                    width: "100%",
                    backgroundColor: "#202424",
                    borderRadius: "5px",
                  }}
                  key={index}
                >
                  <img
                    src={pal.img}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "5px",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      marginLeft: "12px",
                      marginBottom: "3px",
                    }}
                  >
                    {pal.username}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="task-modal-delete-container">
          <button className="task-modal-save" onClick={() => sendPartyRequest(email)}>
            Send Request
          </button>
        </div>
      </div>
      <ActiveScreen />
    </div>
  );
};

export default AddPalModalPopup;
