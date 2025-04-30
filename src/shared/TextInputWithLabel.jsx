import { forwardRef } from "react";

const TextInputWithLabel = forwardRef((props, ref) => {
  const { elementId, label, onChange, value } = props;

  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
});

export default TextInputWithLabel;
