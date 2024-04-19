import React from "react";

const SelectField = ({ label, values, defaultValue, onChange }) => {
  return (
    <div className="task-modal-field-container">
      <div className="text-color">{label}</div>
      <div>
        <select
          className="task-modal-field-select text-color"
          style={{}}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={defaultValue}
        >
          {values.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
