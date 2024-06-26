import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ActiveScreen } from "./generic/ActiveScreen";
import TextField from "./tasklist/modal/TextField";
import { useNavigate } from "react-router-dom";
import AnimationButton from "../pages/AnimationButton";

export const AddPalModalPopup = ({ partyId, partyMembers, onClickOutside }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    onClickOutside();
  });

  const [username, setUsername] = useState("");
  const [requests, setRequests] = useState([{}]);

  const navigate = useNavigate();

  useEffect(() => {
    setRequests(partyMembers.filter((member) => member.verified === 0));
  }, []);

  const sendPartyRequest = async () => {
    if (!username) return;

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
        setUsername("");
      })
      .catch((err) => console.log(err));
  };

  const deleteRequest = async (userId) => {
    await fetch(`http://localhost:3000/api/party/${partyId}/members/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        const newRequests = [...requests].filter((member) => member.user_id !== userId);
        setRequests(newRequests);
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
            padding: "25px 25px 5px 25px",
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
        <TextField caption={"username"} text={username} onTextChange={setUsername} autoFocus />
        {requests.length !== 0 && (
          <div style={{ padding: "12px 25px", fontSize: "medium" }}>
            <div>Current Requests</div>
            <div>
              {requests.map((pal, index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      marginTop: requests.length == 0 ? "8px" : "0px",
                      width: "100%",
                      marginTop: "5px",
                      backgroundColor: "#202424",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/user/${pal.username}`)}
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
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "3px",
                          marginRight: "5px",
                          padding: "5px",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteRequest(pal.user_id);
                        }}
                      >
                        X
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="task-modal-delete-container">
          <AnimationButton text="Send Request" onClick={() => sendPartyRequest()} />
        </div>
      </div>
      <ActiveScreen />
    </div>
  );
};

export default AddPalModalPopup;
