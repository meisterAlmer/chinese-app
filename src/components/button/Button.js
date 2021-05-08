import React from 'react';
import './Button.css';

function Button({ label, clickEvent, disabled, small }) {
  return (
    <button
      type="button"
      onClick={() => clickEvent()}
      disabled={disabled}
      className={small ? 'small button' : 'button'}
    >
      {label}
    </button>
  );
}

export default Button;
