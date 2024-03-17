import React from "react";

const TaskModalTextField = ({ caption, text, onTextChange }) => {
  return (
    <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
      <div className="text-color">{caption}</div>
      <div>
        <input
          className="task-modal-title text-color"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TaskModalTextField;
