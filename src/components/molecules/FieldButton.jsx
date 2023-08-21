import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../atoms/Heading';

function FieldButton({ icon, alt, children, customStyle , onClick }) {

  const defaultStyles = 'bg-fieldButton text-fieldButtonColor hover:bg-bgHover rounded-[6px] cursor-pointer flex h-[52px] items-center gap-1';
  const buttonStyles = `${defaultStyles} ${customStyle}`;

  return (
    <div className={buttonStyles} onClick={onClick}>
      <img src={icon} alt={alt} width="32px" />
      <Heading level="5">{children}</Heading>
    </div>
  );
}

FieldButton.propTypes = {
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  customStyle: PropTypes.string, // Allow custom class names to be passed
};

export default FieldButton;
