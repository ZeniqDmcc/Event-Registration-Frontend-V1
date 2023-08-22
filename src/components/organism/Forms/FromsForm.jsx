import React, { useState } from 'react';
import FieldButton from '../../molecules/FieldButton'
import Button from '../../atoms/Button'

function FromsForm() {

    const [formFields, setFormFields] = useState([]);

    const addFormField = (fieldType) => {
        setFormFields([...formFields, fieldType]);
    };

    const removeFormField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    const renderFormField = (fieldType, index) => {
        switch (fieldType) {
            case 'text':
                return <input key={index} type="text" placeholder="Text Field" />;
            case 'textarea':
                return <textarea key={index} placeholder="Text Area" />;
            case 'checkbox':
                return (
                    <label key={index}>
                        <input type="checkbox" />
                        Checkbox
                    </label>
                );
            // Add more cases for other field types
            default:
                return null;
        }
    };

    let result = () => console.log("Testing")
    let fieldButtonStyle = "w-[48%] justify-left p-8"

    return (
        <div className="h-[65vh] flex flex-col justify-between">
            <div className="flex flex-wrap gap-4">
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/TextT.svg" alt="Text Field" onClick={() => addFormField('text')}>Text Field</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Notches.svg" alt="Text Area" onClick={() => addFormField('text')}>Text Area</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/CheckSquare.svg" alt="Checkbox" onClick={() => addFormField('text')}>Checkbox</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/RadioButton.svg" alt="Radio Button" onClick={() => addFormField('text')}>Radio Button</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/CaretCircleDown.svg" alt="Dropdown" onClick={() => addFormField('text')}>Dropdown</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Calendar.svg" alt="Date" onClick={() => addFormField('text')}>Date</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Paperclip.svg" alt="File Upload" onClick={() => addFormField('text')}>File Upload</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Star.svg" alt="Rating" onClick={() => addFormField('text')}>Rating</FieldButton>
                <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/ThumbsUp.svg" alt="Accept T&C" onClick={() => addFormField('text')}>Accept T&C</FieldButton>
            </div>

            <div>
                {formFields.map((fieldType, index) => (
                    <div key={index}>
                        {renderFormField(fieldType, index)}
                        <Button
                            customButtonStyle="w-full h-[32px] mt-2"
                            variant="secondary"
                            onClick={() => removeFormField(index)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
            <Button customButtonStyle="w-full h-[62px]" variant="primary">Save</Button>
        </div>
    )
}

export default FromsForm