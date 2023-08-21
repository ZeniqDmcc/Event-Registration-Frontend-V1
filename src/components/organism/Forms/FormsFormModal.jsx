import { XIcon } from '@heroicons/react/solid'; // You can import the X icon from Heroicons or any other icon library you prefer
import Heading from '../../atoms/Heading';
import Footer from '../../template/Footer';
import FromsForm from './FromsForm';
import React, { useState } from 'react';
import FieldButton from '../../molecules/FieldButton'
import Button from '../../atoms/Button'

const CreateFormModal = ({ onClose }) => {

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
      case 'radio':
        return (
          <div>
            <input type="radio" name="radiobutton" key={index} placeholder="Text Area" />
            <input type="radio" name="radiobutton" key={index} placeholder="Text Area" />
          </div>
        )
      case 'textarea':
        return <textarea key={index} placeholder="Text Area" />;
      case 'select':
        return (
          <div key={index}>
            <select>
              <option value="">...</option>
              <option value="">Abc</option>
              <option value="">Abc</option>
              <option value="">Abc</option>
              <option value="">Abc</option>
            </select>
          </div>
        )
      case 'date':
        return <input type="date" key={index} placeholder="Date" />;
      case 'file':
        return <input key={index} type="file" />;
      case 'accept':
        return (
          <div>
            <label key={index}>
              <input type="checkbox" /> Yes I accept terms and conditions
            </label>
          </div>
        )
      // Add more cases for other field types
      default:
        return null;
    }
  };

  let result = () => console.log("Testing")
  let fieldButtonStyle = "w-[48%] justify-left p-8"

  return (
    <div className='fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-[80%]'>
        <div className='flex justify-between'>
          <div className="">
            <Heading level="2">Create/Edit Form</Heading>
          </div>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            <XIcon className='w-5 h-5' />
          </button>
        </div>
        {/* Modal Boxes Outer */}
        <div className='flex justify-between mt-4'>
          {/* Form Display Area */}
            <div className='w-[59%] bg-[#F0F0F0] p-5 rounded-[8px]'>
              {/* Form Content Area */}
              <div className="bg-white h-[63vh] ixb-flex-both overflow-y-auto"><div>
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
            </div>
            <Footer />
          </div>
          {/* Form Fields Area */}
          <div className='w-[39%] border p-5 rounded-[8px] border-[#A8A8A8]'>
            <Heading level='5'>Form Elements</Heading>
            <div className='mt-3'>
              <div className="h-[65vh] flex flex-col justify-between">
                <div className="flex flex-wrap gap-4">
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/TextT.svg" alt="Text Field" onClick={() => addFormField('text')}>Text Field</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Notches.svg" alt="Text Area" onClick={() => addFormField('textarea')}>Text Area</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/CheckSquare.svg" alt="Checkbox" onClick={() => addFormField('checkbox')}>Checkbox</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/RadioButton.svg" alt="Radio Button" onClick={() => addFormField('radio')}>Radio Button</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/CaretCircleDown.svg" alt="Dropdown" onClick={() => addFormField('select')}>Dropdown</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Calendar.svg" alt="Date" onClick={() => addFormField('date')}>Date</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Paperclip.svg" alt="File Upload" onClick={() => addFormField('file')}>File Upload</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Star.svg" alt="Rating" onClick={() => addFormField('text')}>Rating</FieldButton>
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/ThumbsUp.svg" alt="Accept T&C" onClick={() => addFormField('accept')}>Accept T&C</FieldButton>
                </div>
                <Button customButtonStyle="w-full h-[62px]" variant="primary">Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal