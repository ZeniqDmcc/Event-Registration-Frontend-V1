import Input from '@/components/atoms/Input';
import { XIcon } from '@heroicons/react/solid';
import { Field, Form, Formik, useFormik } from 'formik';
import { use, useState } from 'react';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import FieldButton from '../../molecules/FieldButton';
import axios from 'axios';

const CreateFormModal = ({ onClose }) => {
  const [formFields, setFormFields] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [fieldLabels, setFieldLabels] = useState({});
  // const [selectFieldOptions, setSelectFieldOptions] = useState({});
  const [selectFieldOptions, setSelectFieldOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  // const [optionsList, setOptionsList] = useState('')
  const [optionsList, setOptionsList] = useState([]);

  let initialValues = {}

  const handleSubmit = async (values) => {

    const formData = {
      formFields: formFields.map((field, index) => {
        const formDataField = {
          fieldLabel: fieldLabels[`field-${index}`] || 'Label',
          fieldType: field.type
        }

        if (field.type === 'select') {
          const fieldName = `select-field-${index}`
          if(Array.isArray(optionsList[fieldName])) {
            formDataField.options = optionsList[fieldName]
          } else {
            formDataField.options = [];
          }
          }

          return formDataField;
        }),
      }

    // const formData = {
    //   formFields: formFields.map((field, index) => {
    //     const fieldName = `field-${index}`;
    //     const formDataField = {
    //       fieldLabel: fieldLabels[fieldName] || 'Label',
    //       fieldType: field.type,
    //       options: field.type === 'select' ? (optionsList.find((item) => item.fieldName === fieldName)?.options || []) : [],
    //     };
    //     return formDataField;
    //   }),
    // };

    console.log("Data:", formData)

    const token = localStorage.getItem('access_token')

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }

    try {
      const response = await axios.post('http://localhost:9003/admin/form/createForm',
        formData,
        { headers }
      )

      if (!response.ok) {
        console.error('Network response not OK:', response.status, response.statusText)
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Form submission successful:', data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleOptionSelect = (fieldName, selectedOption) => {
    formik.setFieldValue(fieldName, selectedOption);
  }

  const StarRating = ({ fieldName, value, setFieldValue }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
      <div>
        {stars.map((star) => (
          <span
            key={star}
            className={`cursor-pointer w-[40px] ${star <= value ? "text-yellow-500" : "text-gray-400"
              }`}
            onClick={() => {
              console.log("Star clicked:", star);
              console.log("fieldName:", fieldName);

              // Update the field value using formik.setFieldValue
              setFieldValue(fieldName, star);
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  }

  const addFormField = (fieldType) => {
    setFormFields([...formFields, { type: fieldType }]);
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [formFields.length]: false,
    }));

    if (fieldType === 'rating') {
      const fieldName = `rating-${formFields.length}`;
      initialValues[fieldName] = 0;
    }
  }

  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    const updatedEditMode = { ...editMode };
    delete updatedEditMode[formFields.length];
    setEditMode(updatedEditMode);
  }

  const handleUnique = () => {
    const uniqueFields = new Set();

    formFields.forEach((fieldType) => {
      if (!uniqueFields.has(fieldType)) {
        uniqueFields.add(fieldType);
      } else {
        console.log(`Field type "${fieldType}" is not unique.`);
      }
    });
  }

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
  }

  const handleLabelChange = (event, index) => {
    const newFieldLabels = { ...fieldLabels }
    newFieldLabels[index] = event.target.value
    setFieldLabels(newFieldLabels)
  }

  const handleEditModeToggle = (index) => {
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [index]: !prevEditModes[index],
    }));
  }

  const handleOptionChange = (fieldName, optionIndex, optionValue) => {
    const newOptions = { ...selectFieldOptions };
    newOptions[fieldName][optionIndex] = optionValue;
    setSelectFieldOptions(newOptions);
  }

  const handleAddOption = (fieldName, optionValue) => {

    setOptionsList((prevOptionsList) => ({
      ...prevOptionsList,
      [fieldName]: [...(prevOptionsList[fieldName] || []), optionValue],
    }))

    const newOptions = { ...selectFieldOptions }
    newOptions[fieldName] = newOptions[fieldName] || []
    newOptions[fieldName].push(optionValue)
    setSelectFieldOptions(newOptions)
  };

  const handleRemoveOption = (fieldName, optionIndex) => {

    setOptionsList((prevOptionsList) =>
      prevOptionsList.filter((_, index) => index !== optionIndex)
    )

    setSelectFieldOptions((prevOptions) => {
      const newOptions = { ...prevOptions }

      if (newOptions[fieldName]) {
        newOptions[fieldName] = newOptions[fieldName].filter((_, index) => index !== optionIndex)
      }

      return newOptions
    })
  }

  const CustomDropdown = ({
    fieldName,
    options,
    selectedOption,
    onSelect,
    onAddOption,
    onRemoveOption,
    onOptionChange,
    onOptionSelect,
  }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [newOptionValue, setNewOptionValue] = useState("")
    const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption)

    const handleInputChange = (event) => {
      setNewOptionValue(event.target.value)
    }

    const handleAddButtonClick = () => {
      if (newOptionValue.trim() !== "") {
        onAddOption(fieldName, newOptionValue)
        setNewOptionValue("")
      }
    }

    const handleOptionClick = (option) => {
      onOptionChange(fieldName, option);
      onSelect(option);
      setShowOptions(false);
      setLocalSelectedOption(option);
      onOptionSelect(option);
    };

    return (
      <div className="relative">
        <div
          className={`w-full bg-white border rounded-t-md cursor-pointer flex items-center justify-between px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 ${showOptions ? "rounded-t-md" : "rounded-md"
            }`}
          onClick={() => setShowOptions(!showOptions)}
        >
          {localSelectedOption || "Select an option..."}
          <svg
            className="w-5 h-5 ml-2 text-gray-400 transform transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: showOptions ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        {showOptions && (
          <div className="options-list border flex flex-col gap-1 py-2 px-1 rounded-b-md mt-2">
            {options.map((option, optionIndex) => (
              <div
                className={`flex items-center justify-between option px-2 py-2 hover:bg-[#f0f0f0] rounded ${selectedOption === option ? "bg-[#f0f0f0]" : ""
                  }`}
                key={optionIndex}
                onClick={() => handleOptionClick(option)}
              >
                <span key={optionIndex} className="option-label cursor-pointer">
                  {option}
                </span>
                <button
                  className="remove-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveOption(fieldName, optionIndex);
                  }}
                >
                  <img width="20" src="/formfield/minus.svg" alt="Delete" />
                </button>
              </div>
            ))}
            <div className="add-option flex border rounded justify-between p-2">
              <input
                className="outline-none"
                type="text"
                placeholder="New option..."
                value={newOptionValue}
                onClick={(event) => event.stopPropagation()}
                onChange={handleInputChange}
              />
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  handleAddButtonClick();
                }}
              >
                <img
                  width="20"
                  src="/formfield/addfield.svg"
                  alt="Add Option"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Fields
  const renderFormField = (field, index) => {
    const fieldIdentifier = `field-${index}`;
    const fieldName = `${field.type}-${fieldIdentifier}`;
    const fieldLabel = fieldLabels[fieldIdentifier] || 'Label';
    const options = selectFieldOptions[fieldName] || [];
    const initialRating = formik.values[fieldName] || 0;

    return (
      <div key={index} className='flex flex-col gap-2'>
        {editMode[index] ? (
          <div>
            <input
              type="text"
              value={fieldLabel}
              onChange={(event) => handleLabelChange(event, fieldIdentifier)}
            />
            <button onClick={() => handleEditModeToggle(index)}>Save</button>
          </div>
        ) : (
          <div>
            <label>{fieldLabel}</label>
            <label
              onClick={() => handleEditModeToggle(index)}
              className="top-[-15px] cursor-pointer inline-block left-3 relative"
            >
              <img src="/formfield/edit.svg" alt="edit" />
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
          {field.type === "select" && (
            <div>
              <CustomDropdown
                fieldName={fieldName}
                options={selectFieldOptions[fieldName] || []}
                selectedOption={selectedOptions[fieldName]}
                onSelect={(selectedOption) => {
                  setSelectedOptions((prevSelectedOptions) => ({
                    ...prevSelectedOptions,
                    [fieldName]: selectedOption,
                  }));
                }}
                onAddOption={(fieldName, optionValue) =>
                  handleAddOption(fieldName, optionValue)
                }
                onRemoveOption={(fieldName, optionIndex) =>
                  handleRemoveOption(fieldName, optionIndex)
                }
                onOptionChange={(fieldName, optionIndex, optionValue) =>
                  handleOptionChange(fieldName, optionIndex, optionValue)
                }
                onOptionSelect={(selectedOption) => {
                  setSelectedOptions((prevSelectedOptions) => ({
                    ...prevSelectedOptions,
                    [fieldName]: selectedOption,
                  }));
                }}
              />
            </div>
          )}

          {field.type === 'date' && (
            <Field type="date" name={fieldName} />
          )}
          {field.type === 'file' && (
            <Field type="file" name={fieldName} />
          )}
          {/* {field.type === 'rating' && (
            <StarRating
              fieldName={fieldName} // Pass the fieldName
              value={formik.values[fieldName] || 0}
              setFieldValue={formik.setFieldValue} // Pass formik.setFieldValue
            />
          )} */}
          {field.type === 'accept' && (
            <>
              <Field type="checkbox" name={fieldName} /> Yes, I accept terms and conditions
            </>
          )}
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
                            {renderFormField(field, index, `select-${index}`)}
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
                  {/* <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/Star.svg" alt="Rating" onClick={() => addFormField('rating')}>Rating</FieldButton> */}
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