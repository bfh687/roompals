import React, { useState, useRef } from "react";
import DropdownMenu from "../../generic/DropdownMenu";

const TaskDropdown = ({ onEdit, onDelete, onClickOutside }) => {
  const options = ["Edit", "Delete"];

  const onOptionClick = (option) => {
    if (option === options[0]) {
      onEdit();
    } else if (option === options[1]) {
      onDelete();
    }
  };

  return (
    <DropdownMenu
      options={options}
      onOptionClick={(option) => onOptionClick(option)}
      onClickOutside={() => onClickOutside()}
    />
  );
};

export default TaskDropdown;
