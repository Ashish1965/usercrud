// Dropdown.js
import React, { useState } from 'react';

function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className='float-left overflow-hidden'>
      <button onClick={handleClick}><input type="text" value={value} name='userState' id='UseState' placeholder='Select Your State' className='border w-full h-10 mt-4 p-6 rounded-md'/></button>
      {isOpen && (
        <div className='absolute border rounded-md bg-white p-5'>
        <ul>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
