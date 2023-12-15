"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateFormBox from '@/components/molecules/CreateFormBox';
import FormHover from '@/components/organism/Forms/formHover';
import CreateFormModal from '@/components/organism/Forms/FormsFormModal';
import ViewSingleFormModal from './ViewSingleFormModal';
import EditFormModal from './EditFormModel';
import Heading from '@/components/atoms/Heading';

const ViewFormsData = () => {
  const [data, setData] = useState([]);
  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);
  const [isSingleFormView, setIsSingleFormView] = useState(false);
  const [isEditFormsView, setIsEditFormsView] = useState(false);
  const [selectedFormsId, setSelectedFormsId] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get('http://localhost:9003/admin/form/allForms', {
        headers: headers,
      });

      if (response.data.status === true) {
        setData(response.data.data);
      } else {
        console.error('Error fetching forms:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleDelete = async (formId) => {
    try {
      setLoading(true);

      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`http://localhost:9003/admin/form/${formId}`, {
        headers: headers,
      });

      if (response.data.status === true) {
        fetchForms();
      } else {
        console.error('Error deleting form:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormClick = (formId) => {
    setSelectedFormsId(formId);
    setIsSingleFormView(true);
  };

  const handleEditform = (formId) => {
    setSelectedFormsId(formId);
    setIsEditFormsView(true);
  };


  const handleDuplicateForm = async (formId) => {
    try {
      setLoading(true);
  
      var formToDuplicate = data.find(form => form.formId === formId);
  
      if (formToDuplicate) {

        for(let i=0; i<formToDuplicate.formFields.length; i++) {
          if(formToDuplicate.formFields[i].isTermsAndConditions == false) {
            delete formToDuplicate.formFields[i]['termsAndConditions'];
            delete formToDuplicate.formFields[i]['_id'];
            formToDuplicate = formToDuplicate;
          }
        }
  
        const token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const response = await axios.post(`http://localhost:9003/admin/form/createForm`,
        {formFields: formToDuplicate.formFields},
        {
          headers: headers,
        });
  
        if (response.data.status === true) {
          fetchForms();
        } else {
          console.error('Error duplicating form:', response.data.error);
        }
      }
    } catch (error) {
      console.error('Error duplicating form:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchForms()
  }, [])

  let box = "w-[23%] h-[349px] rounded-[8px] shadow-secondary group hover:bg-gray-100"
  let singleBox = "w-[23%] ixb-flex-both flex-col gap-6 bg-bluebg h-[349px] rounded-[8px] shadow-secondary cursor-pointer"

  return (
    <div>
      <div className='flex justify-center flex-wrap gap-[32px] mt-[32px]'>
        <CreateFormBox className="w-[23%] bg-bluebg text-white" onClick={() => setIsCreateFormModalOpen(true)} />
        {data.map((form) => (
          <div id="formbg" className={box} key={form.formId}>
            <FormHover
              deleteFormData={() => handleDelete(form.formId)}
              Viewform={() => handleFormClick(form.formId)}
              editForm={() => handleEditform(form.formId)}
              duplicateForm={() => handleDuplicateForm(form.formId)}
              formId={form.formId}
            />
          </div>
        ))}
      </div>
      {isCreateFormModalOpen && <CreateFormModal onClose={() => setIsCreateFormModalOpen(false)} />}
      {isSingleFormView && <ViewSingleFormModal onClose={() => setIsSingleFormView(false)} formId={selectedFormsId} />}
      {isEditFormsView && <EditFormModal onClose={() => setIsEditFormsView(false)} formId={selectedFormsId} />}
    </div>
  )
}

export default ViewFormsData