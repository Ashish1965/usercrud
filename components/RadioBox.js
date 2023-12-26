
import React, { useState } from 'react';

function Radiobox({ label, name , checked, onChange }) {
  return (
    <div className='flex gap-2'>
      <input
        type="radio"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );

}

export default Radiobox;
