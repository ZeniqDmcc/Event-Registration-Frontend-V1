const Paragraph = ({ children, variant }) => {
    let paragraphStyles = {};
  
    switch (variant) {
      case 'primary':
        paragraphStyles = {
          color: '#2B2B2B',
          fontSize: '18px',
          fontWeight: 'bold',
        };
        break;
      case 'secondary':
        paragraphStyles = {
          color: 'green',
          fontSize: '16px',
          fontStyle: 'italic',
        };
        break;
      default:
        paragraphStyles = {}; 
    }
  
    return <p style={paragraphStyles}>{children}</p>;
  };
  
  export default Paragraph;
  