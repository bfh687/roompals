import React from "react";

const TextField = ({ caption, text, type, onTextChange, autoFocus }) => {
  return (
    <div className="task-modal-field-container">
      <div className="text-color" style={{ fontSize: "12px", margin: "6px 0px" }}>
        {caption}
      </div>
      <div>
        <input
          className="task-modal-title text-color"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          type={type}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

export default TextField;
