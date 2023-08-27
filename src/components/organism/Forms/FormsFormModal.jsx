import { XIcon } from '@heroicons/react/solid';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from '../../atoms/Button';
import Heading from '../../atoms/Heading';
import FieldButton from '../../molecules/FieldButton';
import Footer from '../../template/Footer';

const CreateFormModal = ({ onClose }) => {
  const [formFields, setFormFields] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [fieldLabels, setFieldLabels] = useState({});

  const handleSubmit = (values) => {
    console.log(values);
  };

  const initialValues = {
    name: ''
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const addFormField = (fieldType) => {
    setFormFields([...formFields, { type: fieldType }]);
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [formFields.length]: false
    }));
  };

  const handleEditModeToggle = (index) => {
    setEditMode((prevEditModes) => ({
      ...prevEditModes,
      [index]: !prevEditModes[index]
    }));
  };

  const handleLabelChange = (event, index) => {
    const newFieldLabels = { ...fieldLabels };
    newFieldLabels[index] = event.target.value;
    setFieldLabels(newFieldLabels);
  };

  const renderFormField = (field, index) => {
    const fieldName = `${field.type}-${index}`;
    const fieldLabel = fieldLabels[index] || '';

    return (
      <div key={index}>
        {editMode[index] ? (
          <div>
            <input
              type="text"
              value={fieldLabel}
              onChange={(event) => handleLabelChange(event, index)}
            />
            <button onClick={() => handleEditModeToggle(index)}>Save</button>
          </div>
        ) : (
          <div>
            <label>{fieldLabel}</label>
            <button
              onClick={() => handleEditModeToggle(index)}
              className="top-[-15px] left-3 relative"
            >
              <img src="/formfield/edit.svg" alt="edit" />
            </button>
          </div>
        )}
        <Field type="text" name={fieldName} placeholder="Text Field" />
      </div>
    );
  };

  let fieldButtonStyle = "w-[48%] justify-left p-8";

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-[80%]">
        <div className="flex justify-between">
          <div className="">
            <Heading level="2">Create/Edit Form</Heading>
          </div>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-[59%] bg-[#F0F0F0] p-5 rounded-[8px]">
            <div className="bg-white h-[63vh] ixb-flex-both overflow-y-auto">
              <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={handleSubmit}>
                <Form>
                  {/* <Field type="text" name="name" /> */}
                  {formFields.map((field, fieldName, index) => (
                    <div key={index}>
                      {renderFormField(field, fieldName, index)}
                      {console.log(field)}
                    </div>
                  ))}
                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
            <Footer />
          </div>
          <div className="w-[39%] border p-5 rounded-[8px] border-[#A8A8A8]">
            <Heading level="5">Form Elements</Heading>
            <div className="mt-3">
              <div className="h-[65vh] flex flex-col justify-between">
                <div className="flex flex-wrap gap-4">
                  <FieldButton customStyle={fieldButtonStyle} icon="/FormButtonsIcons/TextT.svg" alt="Text Field" onClick={() => addFormField('text')}>Text Field</FieldButton>
                  {/* Add other field buttons */}
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

export default CreateFormModal;
