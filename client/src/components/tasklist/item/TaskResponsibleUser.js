import React from "react";

const ResponsibleUser = ({ responsible }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          lineHeight: "0px",
        }}
      >
        <img
          src="https://avatars.githubusercontent.com/u/57474145?v=4"
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
          }}
        />
      </div>
      <div
        style={{
          marginLeft: "5px",
          marginBottom: "4px",
          marginTop: "2px",
          fontSize: "14px",
        }}
        className="text-color"
      >
        {responsible}
      </div>
    </div>
  );
};

export default ResponsibleUser;
