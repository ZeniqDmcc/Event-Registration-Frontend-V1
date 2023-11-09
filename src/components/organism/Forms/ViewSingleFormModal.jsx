import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import Heading from '@/components/atoms/Heading';
import Footer from '@/components/template/Footer';
import Button from '@/components/atoms/Button';

const ViewSingleFormModel = ({ onClose, formId }) => {
    const router = useRouter();
    const [form, setform] = useState(null);

    useEffect(() => {
        if (!formId) return;
        console.log(formId)

        const fetchform = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(`http://localhost:9003/admin/form/${formId}`, {
                    headers: headers,
                });

                console.log("response.data.data : ", response.data.data)

                if (response.data.status === true) {
                    setform(response.data.data);
                } else {
                    console.error('Error fetching form:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchform();
    }, [formId]);

    const handleDelete = async (formId) => {
        try {
            const token = localStorage.getItem('access_token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.delete(`http://localhost:9003/admin/form/${formId}`, {
                headers: headers,
            });

            if (response.data.status === true) {
                // router.push('/dashboard/forms');
                // Reload the current page
                window.location.reload();
            } else {
                console.error('Error deleting form:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    const handleEdit = () => {
        router.push(`/dashboard/forms/editform/${formId}`);
    };

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-white z-10'>
            <div className='bg-white rounded-lg px-6 w-[80%] h-[80vh] overflow-y-scroll'>
                {form ? (
                    <div key={form.formId}>
                        <div className='flex justify-between'>
                            <Heading level="1">{form.formId}</Heading>
                            <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
                                <XIcon className='w-5 h-5' />
                            </button>
                        </div>
                        <div className="">
                            <form>
                                {form.formFields.map((field, index) => (
                                    <div key={index}>
                                        {field.fieldType === 'text' && (
                                            <div>
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                <input type="text" id={field.fieldName} name={field.fieldName} />
                                            </div>
                                        )}
                                        {field.fieldType === 'textarea' && (
                                            <div>
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                <textarea id={field.fieldName} name={field.fieldName} />
                                            </div>
                                        )}
                                        {field.fieldType === 'checkbox' && (
                                            <div>
                                                <input type="checkbox" id={field.fieldName} name={field.fieldName} />
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                            </div>
                                        )}
                                        {field.fieldType === 'radio' && (
                                            <div>
                                                <label>{field.fieldLabel}</label>
                                                {field.options.map((option, optionIndex) => (
                                                    <div key={optionIndex}>
                                                        <input
                                                            type="radio"
                                                            id={`${field.fieldName}_${optionIndex}`}
                                                            name={field.fieldName}
                                                            value={option}
                                                        />
                                                        <label htmlFor={`${field.fieldName}_${optionIndex}`}>{option}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {field.fieldType === 'dropdown' && (
                                            <div>
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                <select id={field.fieldName} name={field.fieldName}>
                                                    {field.options.map((option, optionIndex) => (
                                                        <option key={optionIndex} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                        {field.fieldType === 'date' && (
                                            <div>
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                <input type="date" id={field.fieldName} name={field.fieldName} />
                                            </div>
                                        )}
                                        {field.fieldType === 'file' && (
                                            <div>
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                <input type="file" id={field.fieldName} name={field.fieldName} accept="image/*" />
                                            </div>
                                        )}
                                        {field.fieldType === 'tandc' && (
                                            <div>
                                                <input type="checkbox" id={field.fieldName} name={field.fieldName} />
                                                <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </form>
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button variant="primary" onClick={handleEdit}>Edit</Button>
                            <Button variant="secondary" onClick={() => handleDelete(formId)}>Delete</Button>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );


};

export default ViewSingleFormModel;



