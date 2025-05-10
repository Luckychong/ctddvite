import React, { forwardRef } from "react";

const TextInputWithLabel = forwardRef(
  ({ label, value, onChange, elementId }, ref) => {
    return (
      <div>
        <label htmlFor={elementId}>{label}</label>
        <input
          type="text"
          id={elementId}
          value={value}
          onChange={onChange}
          ref={ref} 
        />
      </div>
    );
  }
);

export default TextInputWithLabel;
