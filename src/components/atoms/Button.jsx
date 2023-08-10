import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Button = ({ children, variant, onClick, href, customButtonStyle }) => {
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
    case 'hoverButton':
      buttonStyles = {
        backgroundColor: '#F0F0F0',
        color: '#2B2B2B',
        padding: '5px 20px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 0,
        width: '100%',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      };
      break;
    default:
      buttonStyles = {}; 
  }

  const [hovered, setHovered] = useState(false);
  const hoverStyles = {
    backgroundColor: variant === 'primary' ? '#FFEFC6' : '#FFEFC6',
    color: variant === 'primary' ? '#000' : '#000',
  };

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  let ButtonStyle = `${buttonStyles} ${customButtonStyle}`;

  return (
    <button
      className={ButtonStyle}
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
