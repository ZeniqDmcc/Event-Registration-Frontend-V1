import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import FieldButton from '@/components/molecules/FieldButton';
import Button from '@/components/atoms/Button';

function DynamicForm() {
  const initialValues = {
    formFields: [],
  };

  const addFormField = (fieldType, values, setFieldValue) => {
    setFieldValue('formFields', [
      ...values.formFields,
      {
        fieldLabel: fieldType,
        fieldType: fieldType === 'checkbox' ? 'checkbox' : 'text',
        isRequired: false,
      },
    ]);
  };

  const handleSubmit = async (formValues) => {
    try {
      // Send formValues to the backend
      await axios.post('http://localhost:9003/admin/form/createForm', formValues);
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderFormField = (fieldConfig, index) => {
    const { fieldLabel, fieldType, isRequired, options, isTermsAndConditions, termsAndConditions } = fieldConfig;

    switch (fieldType) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={index}>
            <label htmlFor={`field_${index}`}>{fieldLabel}</label>
            <Field
              type={fieldType}
              name={`formFields[${index}].fieldValue`}
              required={isRequired}
              placeholder={`Enter ${fieldLabel}`}
            />
            <ErrorMessage name={`formFields[${index}].fieldValue`} component="div" />
          </div>
        );
      case 'checkbox':
        return (
          <div key={index}>
            <Field type="checkbox" name={`formFields[${index}].fieldValue`} />
            <label>{fieldLabel}</label>
          </div>
        );
      case 'select':
        return (
          <div key={index}>
            <label htmlFor={`field_${index}`}>{fieldLabel}</label>
            <Field as="select" name={`formFields[${index}].fieldValue`}>
              {options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage name={`formFields[${index}].fieldValue`} component="div" />
          </div>
        );
      default:
        return null;
    }
  };

  let fieldButtonStyle = "w-[48%] justify-left p-8"

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <div className="h-[65vh] flex flex-col justify-between">
            <div className="flex flex-wrap gap-4">
              <FieldButton
                customStyle={fieldButtonStyle}
                icon="/FormButtonsIcons/TextT.svg"
                alt="Text Field"
                onClick={() => addFormField('text', values, setFieldValue)}
              >
                Text Field
              </FieldButton>
              {/* Add other field buttons here */}
            </div>
            <div className="flex flex-col gap-4">
              {values.formFields.map((fieldConfig, index) => (
                <div key={index}>{renderFormField(fieldConfig, index)}</div>
              ))}
            </div>
            <Button customButtonStyle="w-full h-[62px]" variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default DynamicForm;
