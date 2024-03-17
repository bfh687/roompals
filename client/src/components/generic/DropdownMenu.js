import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const DropdownMenu = ({ options, onOptionClick, onClickOutside }) => {
  const dropdownRef = useRef();
  useOnClickOutside(dropdownRef, () => onClickOutside());

  if (options.length === 0) return null;

  return (
    <div className="task-item-dropdown" ref={dropdownRef}>
      {options.map((option, index) => (
        <div
          className="task-item-dropdown-option"
          onClick={() => onOptionClick(option)}
          key={index}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
