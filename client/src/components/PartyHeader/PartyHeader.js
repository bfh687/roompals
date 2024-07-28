import React, { useEffect, useRef } from "react";
import PlusIcon from "../icons/PlusIcon";

import { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";

import TestRef from "./TestRef";

import AddPalModalPopup from "../AddPalModalPopup";

import "./PartyHeader.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import * as Resources from "./PartyHeaderResources";
import { useAuth } from "../../contexts/AuthContext";

const PartyHeader = ({ collapsed }) => {
  const auth = useAuth();

  const [showPalModal, setShowPalModal] = useState(false);
  const [partyMembers, setPartyMembers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPartyData = async () => {
      await fetch(`http://localhost:3000/api/party`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length !== 0) {
            setPartyMembers(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadPartyData();
  }, []);

  useEffect(() => {
    if (partyMembers.length === 0 && auth.user) {
      setPartyMembers([auth.user]);
    }
  }, [auth.user]);

  return (
    <>
      <div className="center-horizontal">
        <div className="member-self-container" style={{ paddingLeft: collapsed ? "0px" : "" }}>
          <div
            className="member-self-icon-wrapper"
            style={{ width: collapsed ? "36px" : "", height: collapsed ? "36px" : "" }}
          >
            {partyMembers.length !== 0 ? (
              <img
                src={partyMembers[0]?.img}
                className="member-self-icon img-hoverable"
                style={{ width: collapsed ? "36px" : "", height: collapsed ? "36px" : "" }}
                onClick={() => navigate(`/user/${partyMembers[0]?.username}`)}
              />
            ) : (
              <Skeleton
                style={{ boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)", borderRadius: "10px" }}
                height="100%"
                width="100%"
                baseColor="#1b1d1e"
                highlightColor="#313131"
              />
            )}
          </div>
        </div>
        <div style={{ paddingTop: "12px" }} className="flex-column text-color">
          {partyMembers[0] ? (
            <>
              <div className="bold" style={{ height: "19.25px" }}>
                {partyMembers[0]?.name}
              </div>
              <div style={{ fontSize: "smaller", height: "16.5px" }}>
                @{partyMembers[0].username} {!collapsed && `• Level ${partyMembers[0]?.level}`}
              </div>
            </>
          ) : (
            <>
              <span style={{ maxHeight: "35.75px" }}>
                <Skeleton baseColor="#1b1d1e" highlightColor="#313131" />
                <Skeleton baseColor="#1b1d1e" height="16.5px" highlightColor="#313131" />
              </span>
            </>
          )}
          {!collapsed && (
            <>
              <div
                className="flex"
                style={{ width: "150px", marginTop: "12px", alignItems: "center" }}
              >
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
                  {partyMembers[0]?.health ?? 0}/50
                </span>
              </div>
              <div
                className="flex"
                style={{ width: "150px", marginTop: "4px", alignItems: "center" }}
              >
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
                  {partyMembers[0]?.xp ?? 0}/50
                </span>
              </div>
            </>
          )}
        </div>
        {!collapsed && partyMembers[0]?.party_id && (
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
        )}
      </div>
      {showPalModal && (
        <AddPalModalPopup
          partyId={partyMembers[0]?.party_id}
          partyMembers={partyMembers}
          onClickOutside={() => setShowPalModal(false)}
        />
      )}
    </>
  );
};

export default PartyHeader;
