import React from 'react';

const Input = ({ inputType, field, ...restProps }) => {
  // Common styles for multiple input types
  const commonStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';

  // Apply Tailwind CSS classes based on input type
  let inputStyles = '';

  switch (inputType) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'date':
      inputStyles = commonStyles;
      break;
    case 'checkbox':
    case 'radio':
      inputStyles = 'border border-[#1475DC] rounded-m p-[4px]';
      break;
    default:
      // Default styles for other input types
      inputStyles = commonStyles;
      break;
  }
  

  return <input className={inputStyles} type={inputType || 'text'} {...field} {...restProps} />;
};

export default Input;
