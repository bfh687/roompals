import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useAuth } from "../../contexts/AuthContext";

import NotificationSilencedIcon from "../icons/NotificationSilencedIcon";
import AnimationButton from "../../pages/AnimationButton";

const NavbarDropdown = ({ onClickOutside }) => {
  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => onClickOutside());

  const auth = useAuth();

  const acceptRequest = async (partyId) => {
    const userId = auth.user.user_id;
    await fetch(`http://localhost:3000/api/party/${partyId}/members/${userId}`, {
      method: "PUT",
    })
      .then(() => {
        setTimeout(() => auth.refresh(), 1000);
      })
      .catch((err) => console.log(err));
  };

  const rejectRequest = (partyId) => {
    const userId = auth.user.user_id;
    fetch(`http://localhost:3000/api/party/${partyId}/members/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        auth.refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: "50px",
        right: "5px",
        minWidth: "300px",
        backgroundColor: "#1b1d1e",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "3px 3px 5px 5px rgba(0, 0, 0, 0.3)",
        maxHeight: "500px",
        overflow: "scroll",
      }}
      className="text-color"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {auth.user?.notifications?.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              <NotificationSilencedIcon width={32} height={32} />
              <div style={{ fontSize: "small", fontWeight: "bold", marginTop: "6px" }}>
                Notifications
              </div>
              <div style={{ fontSize: "smaller", textAlign: "center", marginTop: "4px" }}>
                Notifications will appear here!
              </div>
            </div>
          </div>
        ) : (
          auth.user?.notifications.map((notif, index) => (
            <>
              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
                key={index}
              >
                <img
                  src={notif.party_img}
                  style={{
                    width: "75px",
                    height: "75px",
                    borderRadius: "50%",
                    margin: "8px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                    marginTop: "8px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{notif.name}</div>
                  <div style={{ fontSize: "10px" }}>1 hour ago</div>
                  <div style={{ marginTop: "12px", display: "flex" }}>
                    <span style={{ margin: "0px 8px 0px 0px" }}>
                      <AnimationButton
                        text="Accept"
                        width={83}
                        onClick={() => acceptRequest(notif.id)}
                        disappearAfterOnClick
                      />
                    </span>
                    <AnimationButton
                      text="Reject"
                      width={83}
                      buttonColor="#c32940"
                      onClick={() => rejectRequest(notif.id)}
                      disappearAfterOnClick
                    />
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default NavbarDropdown;
