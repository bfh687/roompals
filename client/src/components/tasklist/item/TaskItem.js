import React, { useState, useEffect, useRef } from "react";

import "../../../App.css";

import ElipsesButton from "./TaskElipsesButton";
import TaskModalPopup from "../modal/TaskModalPopup";
import TaskDropdown from "./TaskDropdown";
import TaskCheckbox from "./TaskCheckbox";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import ResponsibleUser from "./TaskResponsibleUser";

const TaskItem = ({
  task,
  selectedTask,
  index,
  onCheckboxChange,
  onOptionMenu,
  onClick,
  onDelete,
}) => {
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => setShowTaskDropdown(false));

  const onContentClick = (id) => {
    onClick();
    onEditTaskOption(id);
  };

  const onEditTaskOption = (id) => {
    setShowTaskModal(true);
    setShowTaskDropdown(false);
  };

  const onDeleteTaskOption = (id) => {
    onDelete();
    setShowTaskDropdown(false);
  };

  const onClickOutsideTaskDropdown = () => {
    setShowTaskDropdown(false);
  };

  const shouldShowDropdown = (index) => {
    return showTaskDropdown && selectedTask === index;
  };

  const shouldShowModal = (index) => {
    return showTaskModal && selectedTask === index;
  };

  return (
    <div>
      <div className="task-item">
        <TaskCheckbox task={task} onCheckboxChange={onCheckboxChange} />
        <div className="task-item-content">
          <div style={{ width: "100%" }} onClick={() => onContentClick(task.id)}>
            <div style={{ paddingTop: "5px" }} className="text-color">
              {task.content}
            </div>
            {task.responsible && <ResponsibleUser responsible={task.responsible} />}
          </div>
          <div
            style={{
              width: "30px",
              position: "relative",
            }}
            className="center"
          >
            <ElipsesButton
              onClick={() => {
                onOptionMenu();
                setShowTaskDropdown(!showTaskDropdown);
              }}
            />
            {shouldShowDropdown(index) && (
              <TaskDropdown
                onEdit={() => onEditTaskOption()}
                onDelete={() => onDeleteTaskOption(task.id)}
                onClickOutside={() => onClickOutsideTaskDropdown()}
              />
            )}
          </div>
        </div>
      </div>
      {shouldShowModal(index) && (
        <TaskModalPopup
          task={task}
          onSave={(updatedTask) => {
            task = updatedTask;
          }}
          onDelete={() => {
            onDelete();
            setShowTaskModal(false);
          }}
          onClickOutside={() => {
            setShowTaskModal(false);
          }}
        />
      )}
    </div>
  );
};

export default TaskItem;
