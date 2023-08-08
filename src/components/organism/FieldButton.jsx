import React from 'react';
import PropTypes from 'prop-types'; // Import prop-types

import Heading from '../atoms/Heading';

function FieldButton({ icon, alt, children }) {
  return (
    <div className='bg-fieldButton text-fieldButtonColor flex justify-center h-[52px] items-center gap-2'>
      <img src={icon} alt={alt} />
      <Heading level="5">{children}</Heading>
    </div>
  );
}

FieldButton.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default FieldButton;
