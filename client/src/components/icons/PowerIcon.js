import React from "react";

const PowerIcon = ({ width, height, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
        />
      </svg>
    </svg>
  );
};

export default PowerIcon;
