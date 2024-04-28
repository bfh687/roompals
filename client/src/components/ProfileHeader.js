import React, { useEffect } from "react";
import PlusIcon from "./icons/PlusIcon";

import { useState } from "react";
import AddPalModalPopup from "./AddPalModalPopup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfileHeader = () => {
  const [showPalModal, setShowPalModal] = useState(false);
  const [partyMembers, setPartyMembers] = useState([{}]);

  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    // load profile data
    const loadPartyData = async () => {
      await fetch(`http://localhost:3000/api/party/${1}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setPartyMembers(res);
        })
        .catch((err) => console.log(err));
    };

    loadPartyData();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#121414" }} className="center-horizontal">
        <div
          style={{
            padding: "12px 12px 12px 24px",
          }}
          className="horizontal-center"
        >
          <div style={{ width: "96px", height: "96px", borderRadius: "10px" }}>
            {partyMembers.length !== 32 ? (
              <img
                src={partyMembers[0].img}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                }}
                onClick={() => navigate(`/user/${partyMembers[0].username}`)}
              />
            ) : (
              <Skeleton
                style={{ boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)" }}
                height="100%"
                width="100%"
                baseColor="#1b1d1e"
                highlightColor="#313131"
              />
            )}
          </div>
        </div>
        <div style={{ paddingTop: "12px" }} className="flex-column text-color">
          <div className="bold">{partyMembers[0].name}</div>
          <div style={{ fontSize: "smaller" }}>@{partyMembers[0].username} • Level 1</div>
          <div className="flex">
            <div className="bar-filled xp-bar-filled-color" />
            <div className="bar-empty xp-bar-empty-color" />
          </div>
          <div className="flex">
            <div className="bar-filled health-bar-filled-color" />
            <div className="bar-empty health-bar-empty-color" />
          </div>
        </div>
        <div
          className="flex-column text-color"
          style={{
            paddingTop: "12px",
            marginLeft: "24px",
          }}
        >
          <div className="flex">
            <div className="bold">Your Pals</div>
          </div>
          <div style={{ paddingTop: "6px" }} className="flex">
            {partyMembers.map((pal, index) => {
              if (index == 0 || pal.verified == 0) return;

              return (
                <div
                  style={{
                    padding: "0",
                    margin: "0",
                    height: "100%",
                    paddingLeft: "6px",
                    paddingRight: "6px",
                  }}
                  key={pal.user_id}
                  className="flex-column center"
                >
                  <img
                    src={pal.img}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/user/${pal.username}`)}
                  />
                  <div style={{ fontSize: "smaller", fontWeight: "bold", padding: "3px" }}>
                    {pal.name}
                  </div>
                </div>
              );
            })}

            <div
              style={{
                padding: "0",
                margin: "0",
                height: "100%",
                paddingLeft: "6px",
                paddingRight: "6px",
              }}
              className="center flex-column"
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#0e0f0f",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                className="center"
              >
                <PlusIcon width={36} height={36} onClick={() => setShowPalModal(true)} />
              </div>
              <div
                style={{ fontSize: "smaller", fontWeight: "bold", padding: "3px", opacity: "0" }}
              >
                .
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPalModal && (
        <AddPalModalPopup
          partyId={1}
          partyMembers={partyMembers}
          onClickOutside={() => setShowPalModal(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
