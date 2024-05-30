import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Tooltip from "../generic/Tooltip";

const TestRef = ({ pal }) => {
  const elRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div key={pal.user_id} className="flex-column center member-container">
      <img
        src={pal.img}
        className="member-icon img-hoverable"
        ref={elRef}
        onClick={() => navigate(`/user/${pal.username}`)}
      />
      <Tooltip
        elementRef={elRef}
        children={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "34px", height: "34px", margin: "2px" }}>
                <img style={{ width: "100%", height: "100%", borderRadius: "3px" }} src={pal.img} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    margin: "2px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {pal.name}
                </div>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    margin: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ${pal.username}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className="flex"
                style={{ width: "150px", marginTop: "12px", alignItems: "center" }}
              >
                <div style={{ width: "120px" }} className="flex">
                  <div
                    style={{
                      width: (pal.health || 50 / 50) * 100 + "%",
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
                  {pal.health || 50}/50
                </span>
              </div>
              <div
                className="flex"
                style={{ width: "150px", marginTop: "4px", alignItems: "center" }}
              >
                <div style={{ width: "120px" }} className="flex">
                  <div
                    style={{
                      width: (pal.xp || 50 / 50) * 100 + "%",
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
                  {pal.xp || 50}/50
                </span>
              </div>
            </div>
          </div>
        }
      />

      <div className="member-name text-hoverable" onClick={() => navigate(`/user/${pal.username}`)}>
        {pal.name}
      </div>
    </div>
  );
};

export default TestRef;
