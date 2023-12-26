// Dropdown.js
import React, { useState } from 'react';

function stateDropdown({ state, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (state) => {
    setIsOpen(false);
    onChange(state);
  };

  return (
    <div className="dropdown">
      <button onClick={handleClick}>{value || "Select an State"}</button>
      {isOpen && (
        <ul>
          {options.map((state) => (
            <li key={state} onClick={() => handleOptionClick(state)}>
              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default stateDropdown;
