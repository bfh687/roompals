import React, { useEffect, useRef } from "react";
import PlusIcon from "../icons/PlusIcon";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TestRef from "./TestRef";

import AddPalModalPopup from "../AddPalModalPopup";

import "./PartyHeader.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import * as Resources from "./PartyHeaderResources";

const PartyHeader = ({ partyId }) => {
  const [showPalModal, setShowPalModal] = useState(false);
  const [partyMembers, setPartyMembers] = useState([]);

  const memberRefs = useRef([]);
  const createRefs = (length) => {
    memberRefs.current = Array(length)
      .fill()
      .map((_, index) => memberRefs.current[index] || React.createRef());
  };

  useEffect(() => {
    createRefs(partyMembers.length);
  }, [partyMembers.length]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPartyData = async () => {
      await fetch(`http://localhost:3000/api/party/${partyId}`, {
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
      <div className="center-horizontal">
        <div className="member-self-container">
          <div className="member-self-icon-wrapper">
            {partyMembers.length !== 0 ? (
              <img
                src={partyMembers[0].img}
                className="member-self-icon img-hoverable"
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
          <div className="bold">{partyMembers[0]?.name}</div>
          <div style={{ fontSize: "smaller" }}>
            @{partyMembers[0]?.username} • Level {partyMembers[0]?.level}
          </div>
          <div className="flex" style={{ width: "150px", marginTop: "12px", alignItems: "center" }}>
            <div style={{ width: "120px" }} className="flex">
              <div
                style={{
                  width: (partyMembers[0]?.health / 50) * 100 + "%",
                  backgroundColor: "#c36c79",
                }}
                className="bar-filled"
              />
              <div className="bar-empty health-bar-empty-color" style={{}} />
            </div>
            <span
              style={{
                whiteSpace: "nowrap",
                fontSize: "12px",
                marginBottom: "2px",
                paddingLeft: "8px",
              }}
            >
              {partyMembers[0]?.health}/50
            </span>
          </div>
          <div className="flex" style={{ width: "150px", marginTop: "4px", alignItems: "center" }}>
            <div style={{ width: "120px" }} className="flex">
              <div
                style={{
                  width: (partyMembers[0]?.xp / 50) * 100 + "%",
                }}
                className="bar-filled xp-bar-filled-color"
              />
              <div className="bar-empty xp-bar-empty-color" />
            </div>
            <span
              style={{
                whiteSpace: "nowrap",
                fontSize: "12px",
                marginBottom: "2px",
                paddingLeft: "8px",
              }}
            >
              {partyMembers[0]?.xp}/50
            </span>
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
            <div className="bold">{Resources.YourPals}</div>
          </div>
          <div style={{ paddingTop: "6px" }} className="flex">
            {partyMembers.map((pal, index) => {
              if (index == 0 || pal.verified == 0) return;
              return <TestRef pal={pal} />;
            })}
            <div className="center flex-column add-button-wrapper">
              <div className="center add-button-icon img-hoverable">
                <PlusIcon width={36} height={36} onClick={() => setShowPalModal(true)} />
              </div>
              <div className="member-name-placeholder">*</div>
            </div>
          </div>
        </div>
      </div>
      {showPalModal && (
        <AddPalModalPopup
          partyId={partyId}
          partyMembers={partyMembers}
          onClickOutside={() => setShowPalModal(false)}
        />
      )}
    </>
  );
};

export default PartyHeader;
