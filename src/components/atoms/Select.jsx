// components/atoms/SelectAtom.js

const Select = ({ options, style, ...restProps }) => {
    const selectStyles = {
      padding: '8px 12px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      width: '100%',
      ...style, // Merge custom styles with the default styles
    };
  
    return (
      <select style={selectStyles} {...restProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  
  export default Select;
  