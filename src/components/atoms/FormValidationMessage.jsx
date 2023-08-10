import React from 'react';

const FormValidationMessage = ({ type, message }) => {
  let textColor = '';

  if (type === 'error') {
    textColor = 'text-red-500';
  } else if (type === 'success') {
    textColor = 'text-green-500';
  }

  return (
    <div className={`mt-2 ${textColor}`}>
      {message}
    </div>
  );
};

export default FormValidationMessage;
