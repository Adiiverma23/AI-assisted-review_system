/**
 * @param {string} placeholder
 * @param {string} value
 * @param {function} onChange
 */
function Input({ placeholder, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;