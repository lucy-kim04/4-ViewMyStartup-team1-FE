// 김세환

import React from 'react';
import './Dropdown.css';

const Dropdown = ({ options, selectedValue, onChange }) => {
  return (
    <select
      className="dropdown-btn"
      value={selectedValue}
      onChange={e => onChange(e.target.value)}
    >
      <option className="dropdown-menu" value="" disabled></option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
