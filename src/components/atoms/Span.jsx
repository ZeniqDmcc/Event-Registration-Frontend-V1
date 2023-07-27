const Span = ({ children, variant }) => {
    let spanStyles = {};
  
    switch (variant) {
      case 'primary':
        spanStyles = {
          color: 'blue',
          fontSize: '16px',
          fontWeight: 'bold',
        };
        break;
      case 'secondary':
        spanStyles = {
          color: 'green',
          fontSize: '14px',
          fontStyle: 'italic',
        };
        break;

      default:
        spanStyles = {}; 
    }
  
    return <span style={spanStyles}>{children}</span>;
  };
  
  export default Span;
  