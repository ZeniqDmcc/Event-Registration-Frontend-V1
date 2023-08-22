import React from 'react';

const Input = ({ inputType, field, ...restProps }) => {
  // Apply Tailwind CSS classes based on input type
  let inputStyles = '';

  switch (inputType) {
    case 'text':
      inputStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';
      break;
    case 'email':
      inputStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';
      break;
    case 'password':
      inputStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';
      break;
    case 'number':
      inputStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';
      break;
    case 'date':
      inputStyles = 'rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary h-[46px] outline-none';
      break;
    case 'checkbox':
      inputStyles = 'border border-gray-500 rounded-md bg-white shadow-md p-[4px]';
      break;
    case 'radio':
      inputStyles = 'border border-gray-500 rounded-md bg-white shadow-md p-[4px]';
      break;
    case 'file':
      inputStyles = 'border border-gray-500 rounded-md bg-white shadow-md p-[4px]';
      break;
    default:
      // Default styles for other input types
      inputStyles = 'text-lg'; // Or any default styles you want
  }

  return <input className={inputStyles} type={inputType} {...field} {...restProps} />;
};

export default Input;
