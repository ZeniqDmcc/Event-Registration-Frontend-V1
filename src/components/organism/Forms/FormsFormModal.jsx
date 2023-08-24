import { XIcon } from '@heroicons/react/solid';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import FieldButton from '../../molecules/FieldButton';
import Footer from '../../template/Footer';
// import { unique } from 'next/dist/build/utils';

const validationSchema = Yup.object().shape({
  text: Yup.string().required('Text field is required'),
  textarea: Yup.string().required('Text area is required'),
  checkbox: Yup.boolean().oneOf([true], 'Checkbox must be checked'),
  radio: Yup.string().required('Please select a radio option'),
  select: Yup.string().required('Please select an option'),
  date: Yup.date().required('Date is required'),
  file: Yup.mixed().required('File upload is required'),
  accept: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const CreateFormModal = ({ onClose }) => {
  const [formFields, setFormFields] = useState([]);
  const [label, setLabel] = useState('');
  const [editMode, setEditMode] = useState({});

  const addFormField = (fieldType) => {
    setFormFields([...formFields, { type: fieldType, label: '' }]);
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [formFields.length]: false,
    }));
  };
  
  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  
    // Update editMode object to match the new length of formFields
    const updatedEditMode = { ...editMode };
    delete updatedEditMode[formFields.length];
    setEditMode(updatedEditMode);
  };

  const handleUnique = () => {
    const uniqueFields = new Set();

    formFields.forEach((fieldType) => {
      if (!uniqueFields.has(fieldType)) {
        uniqueFields.add(fieldType);
      } else {
        // Handle non-unique case
        console.log(`Field type "${fieldType}" is not unique.`);
      }
    });
  };

  const handleRequired = () => {
    // Assuming you have a state variable to track required fields
    const requiredFields = new Set(['text', 'textarea', 'checkbox', 'radio', 'select', 'date', 'file', 'accept']);

    // Loop through the formFields array and mark required fields
    formFields.forEach((fieldType, index) => {
      if (requiredFields.has(fieldType)) {
        console.log(`Field type "${fieldType}" is now required.`);
      } else {
        // Handle non-required case
        console.log(`Field type "${fieldType}" is not required.`);
      }
    });
  };

  const handleLabelChange = (event, index) => {
    const newFormFields = [...formFields];
    newFormFields[index].label = event.target.value;
    setFormFields(newFormFields);
  }

  const handleEditModeToggle = (index) => {
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [index]: !prevEditModes[index],
    }));
  };

  // Render Fields
  const renderFormField = (fieldType, index, fieldLabel, editMode, handleLabelChange, handleEditModeToggle) => {
    const isEditMode = editMode[index];

    switch (fieldType) {
      case 'text':
        return (
          <label key={index}>
            {isEditMode ? (
              <div>
                <input type="text" value={fieldLabel} onChange={handleLabelChange} />
                <button onClick={() => handleEditModeToggle(index)}>Save</button>
              </div>
            ) : (
              <div>
                <label>{fieldLabel}</label>
                <button onClick={() => handleEditModeToggle(index)} className="top-[-15px] left-3 relative">
                  <img src='/formfield/edit.svg' alt="edit" />
                </button>
              </div>
            )}
            <input type="text" placeholder="Text Field" />
          </label>
        );
      case 'textarea':
        return (
          <label key={index}>
            {isEditMode ? (
              <div>
                <input type="text" value={fieldLabel} onChange={handleLabelChange} />
                <button onClick={() => handleEditModeToggle(index)}>Save</button>
              </div>
            ) : (
              <div>
                <label>{fieldLabel}</label>
                <button onClick={() => handleEditModeToggle(index)} className="top-[-15px] left-3 relative">
                  <img src='/formfield/edit.svg' alt="edit" />
                </button>
              </div>
            )}
            <textarea placeholder="Text Area" />
          </label>
        )
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
        );
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
        );
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
        );
      // Add more cases for other field types
      default:
        return null;
    }
  };


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
              <Formik
                initialValues={{}} // Initialize your form field values here
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex flex-col gap-8">
                      {formFields.map((field, index) => (
                        <div className="flex item gap-3" key={index}>
                          <div>{renderFormField(
                            field.type,
                            index,
                            field.label,
                            editMode,
                            (event) => handleLabelChange(event, index),
                            handleEditModeToggle
                          )}</div>
                          <div className="flex gap-2">
                            <button onClick={handleUnique}><img src='/formfield/unique.svg' /></button>
                            <button onClick={handleRequired}><img src='/formfield/required.svg' /></button>
                            <button onClick={() => removeFormField(index)}><img src='/formfield/minus.svg' /></button>
                            <button onClick={() => addFormField(field.type)}><img src='/formfield/addfield.svg' /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Form>
                )}
              </Formik>
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
  )
}

export default CreateFormModal