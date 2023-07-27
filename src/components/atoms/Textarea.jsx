// components/atoms/TextareaAtom.js

const Textarea = ({ ...restProps }) => {
    const textareaStyles = {
      padding: '8px 12px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      width: '100%',
      minHeight: '100px', 
      resize: 'vertical', 
    };
  
    return <textarea style={textareaStyles} {...restProps} />;
};
  
export default Textarea;

