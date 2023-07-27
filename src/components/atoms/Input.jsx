const Input = ({ inputType, ...restProps }) => {
    let inputStyles = {
      padding: '8px 12px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      width: '100%',
    };
  
    // Customize styles for specific input types
    switch (inputType) {
      case 'text':
        // No additional styles for text input
        break;
      case 'email':
        // Additional styles for email input
        break;
      case 'password':
        // Additional styles for password input
        break;
      case 'number':
        // Additional styles for number input
        break;
      case 'date':
        // Additional styles for date input
        break;
      case 'checkbox':
        // Additional styles for checkbox input
        break;
      case 'radio':
        // Additional styles for radio input
        break;
      case 'file':
        // Additional styles for file input
        break;
      // Add more cases for different input types as needed
      default:
        // No additional styles for other input types
        break;
    }
  
    return <input type={inputType} style={{ ...inputStyles }} {...restProps} />;
  };
  
  export default Input;
  