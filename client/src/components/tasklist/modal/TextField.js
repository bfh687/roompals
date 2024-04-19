import React from "react";

const TextField = ({ caption, text, type, onTextChange }) => {
  return (
    <div className="task-modal-field-container">
      <div className="text-color">{caption}</div>
      <div>
        <input
          className="task-modal-title text-color"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          type={type}
        />
      </div>
    </div>
  );
};

export default TextField;
