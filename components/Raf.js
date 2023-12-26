// RadioButton.js
import React, { useState } from 'react';

function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <div>
      <input
        type="radio"
        id={name}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default RadioButton;
