import React from "react";

const TaskCheckbox = ({ task, onCheckboxChange }) => {
  return (
    <div className="task-item-checkbox-container">
      <div className="task-item-checkbox" onClick={() => onCheckboxChange()}>
        <div
          className={
            task.checked ? "task-item-checkbox-icon-checked" : "task-item-checkbox-icon-unchecked"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            style={{ marginBottom: "1px" }}
            fill="#3f4346"
          >
            <path d="M6.54 13c-.3 0-.59-.13-.81-.35L2 8.75l1.62-1.69 2.86 2.98L12.26 3 14 4.56l-6.59 8.02c-.21.25-.51.4-.83.42h-.04z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TaskCheckbox;
