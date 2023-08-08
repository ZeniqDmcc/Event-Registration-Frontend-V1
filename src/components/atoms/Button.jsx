import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Button = ({ children, variant, onClick, href }) => {
  const router = useRouter();
  let buttonStyles = {};

  switch (variant) {
    case 'primary':
      buttonStyles = {
        backgroundColor: '#1475DC',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 0,
        width: '100%',
        height: '52px',
      };
      break;
    case 'secondary':
      buttonStyles = {
        backgroundColor: '#fff',
        color: '#000',
        padding: '10px 20px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 0,
        width: '100%',
        height: '52px',
      };
      break;
    // Add more cases for different variants as needed
    default:
      buttonStyles = {}; // No specific styles for other variants
  }

  // Hover styles
  const [hovered, setHovered] = useState(false);
  const hoverStyles = {
    backgroundColor: variant === 'primary' ? '#FFEFC6' : '#FFEFC6',
    color: variant === 'primary' ? '#000' : '#000',
  };

  // Handle click and redirect
  const handleClick = () => {
    if (href) {
      router.push(href); // Redirect to the specified href
    } else if (onClick) {
      onClick(); // Call the onClick function if provided
    }
  };

  return (
    <button
      style={{
        ...buttonStyles,
        backgroundColor: hovered ? hoverStyles.backgroundColor : buttonStyles.backgroundColor,
        color: hovered ? hoverStyles.color : buttonStyles.color,
      }}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
