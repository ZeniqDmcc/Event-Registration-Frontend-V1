import { XIcon } from '@heroicons/react/solid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import FieldButton from '../../molecules/FieldButton';
import Footer from '../../template/Footer';
import Input from '@/components/atoms/Input';


const CreateFormModal = ({ onClose }) => {
  const [formFields, setFormFields] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [fieldLabels, setFieldLabels] = useState({});
  const [selectFieldOptions, setSelectFieldOptions] = useState({});

  const handleSubmit = (values) => {
    console.log(values)
  }

  let initialValues = {}

  const addFormField = (fieldType) => {
    setFormFields([...formFields, { type: fieldType }]);
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [formFields.length]: false,
    }));
  };

  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

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
        console.log(`Field type "${fieldType}" is not unique.`);
      }
    });
  };

  const handleRequired = () => {
    const requiredFields = new Set(['text', 'textarea', 'checkbox', 'radio', 'select', 'date', 'file', 'accept']);

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
    const newFieldLabels = { ...fieldLabels };
    newFieldLabels[index] = event.target.value;
    setFieldLabels(newFieldLabels);
  };

  const handleEditModeToggle = (index) => {
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [index]: !prevEditModes[index],
    }));
  };

  const handleOptionChange = (event, fieldName, optionIndex) => {
    const newOptions = { ...selectFieldOptions };
    newOptions[fieldName][optionIndex] = event.target.value;
    setSelectFieldOptions(newOptions);
  };

  const handleAddOption = (fieldName) => {
    const newOptions = { ...selectFieldOptions };
    newOptions[fieldName] = newOptions[fieldName] || [];
    newOptions[fieldName].push('');
    setSelectFieldOptions(newOptions);
  };

  const handleRemoveOption = (fieldName, optionIndex) => {
    const newOptions = { ...selectFieldOptions };
    newOptions[fieldName].splice(optionIndex, 1);
    setSelectFieldOptions(newOptions);
  };

  // Render Fields
  const renderFormField = (field, index) => {
    const fieldName = `${field.type}-${index}`;
    const fieldLabel = fieldLabels[index] || '';
    const options = selectFieldOptions[fieldName] || [];

    return (
      <div key={index} className='flex flex-col gap-2'>
        {editMode[index] ? (
          <div>
            <input type="text" value={fieldLabel} onChange={(event) => handleLabelChange(event, index)} />
            <button onClick={() => handleEditModeToggle(index)}>Save</button>
          </div>
        ) : (
          <div>
            <label>{fieldLabel}</label>
            <label onClick={() => handleEditModeToggle(index)} className="top-[-15px] cursor-pointer inline-block left-3 relative">
              <img src='/formfield/edit.svg' alt="edit" />
            </label>
          </div>
        )}
        <>
          {field.type === 'text' && (
            <Field component={Input} inputType="text" name={fieldName} placeholder="Text Field" />
          )}
          {field.type === 'textarea' && (
            <Field as="textarea" name={fieldName} placeholder="Text Area" />
          )}
          {field.type === 'checkbox' && (
            <Field type="checkbox" name={fieldName} />
          )}
          {field.type === 'radio' && (
            <>
              <Field type="radio" name={fieldName} value="option1" />
              <Field type="radio" name={fieldName} value="option2" />
            </>
          )}

          {/* Select */}
          {/* {field.type === 'select' && (
            <>
              <Field as="select" name={fieldName}>
                <option value="">...</option>
                {options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
                {editMode[index] && (
                  <optgroup label="Edit Options">
                    {options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="__add_option__">Add Option</option>
                  </optgroup>
                )}
              </Field>

              {editMode[index] && (
                <div>
                  <label>Edit Options:</label>
                  {options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        value={option}
                        onChange={(event) => handleOptionChange(event, fieldName, optionIndex)}
                      />
                      <button onClick={() => handleRemoveOption(fieldName, optionIndex)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )} */}
          
          {field.type === 'select' && (
            <>
              <div>
  <Field as="select" name={fieldName}>
    <option value="">...</option>
    {options.map((option, optionIndex) => (
      <option key={optionIndex} value={option}>
        {option}
      </option>
    ))}
  </Field>
  {options.map((option, optionIndex) => (
    <div key={optionIndex}>
      <span className='text-red-800'>{option}</span>
      <button className='bg-red-700' onClick={() => handleRemoveOption(fieldName, optionIndex)}>Remove</button>
    </div>
  ))}
</div>

              <div>
                {options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(event) => handleOptionChange(event, fieldName, optionIndex)}
                    />
                    <button onClick={() => handleRemoveOption(fieldName, optionIndex)}>Remove</button>
                  </div>
                ))}
                <button onClick={() => handleAddOption(fieldName)}>Add Option</button>
              </div>
            </>
          )}

          {/* Select End */}

          {field.type === 'date' && (
            <Field type="date" name={fieldName} />
          )}
          {field.type === 'file' && (
            <Field type="file" name={fieldName} />
          )}
          {field.type === 'accept' && (
            <>
              <Field type="checkbox" name={fieldName} /> Yes, I accept terms and conditions
            </>
          )}
          {/* Add cases for other field types */}
        </>
      </div>
    );
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
            <div className="bg-white h-[63vh] flex overflow-y-auto ixb__form__outer"><div>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className='p-16 w-full'>
                    <div className="flex flex-col gap-8">
                      {formFields.map((field, index) => (
                        <div className="flex justify-start gap-3" key={index}>
                          <div>
                            {renderFormField(field, index)}
                          </div>
                          <div className="flex gap-2 justify-end items-end pb-2">
                            <button onClick={handleUnique}><img src='/formfield/unique.svg' /></button>
                            <button onClick={handleRequired}><img src='/formfield/required.svg' /></button>
                            <button onClick={() => removeFormField(index)}><img src='/formfield/minus.svg' /></button>
                            <button onClick={() => addFormField(field.type)}><img src='/formfield/addfield.svg' /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="submit">Save</button>
                  </div>
                </Form>
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