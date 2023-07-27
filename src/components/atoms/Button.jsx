const Button = ({ children, variant, onClick }) => {
    let buttonStyles = {};
  
    switch (variant) {
      case 'primary':
        buttonStyles = {
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
        };
        break;
      case 'secondary':
        buttonStyles = {
          backgroundColor: 'green',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer',
        };
        break;
      // Add more cases for different variants as needed
      default:
        buttonStyles = {}; // No specific styles for other variants
    }
  
    return (
      <button style={buttonStyles} type="button" onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;
  