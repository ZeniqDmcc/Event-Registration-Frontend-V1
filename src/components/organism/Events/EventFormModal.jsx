"use client"
import { XIcon } from '@heroicons/react/solid'; // You can import the X icon from Heroicons or any other icon library you prefer
import Heading from '../../atoms/Heading';
import Footer from '../../template/Footer';
// import CreateNewEvent from "@/components/organism/Events/CreateNewEvent"

import Auth from "@/components/auth/Auth"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";


const EventFormModal = ({ onClose }) => {


  const [success, setSuccess] = useState('');

  const initialValues = {
    eventId: '',
    eventName: '',
    eventUrl: '',
    description: '',
    startDate: '',
    endDate: '',
    socialMediaLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
    logo: null, // Store the selected logo file here
    banner: null, // Store the selected banner file here
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {

      console.log(values)
      // Create a FormData object to send the form data and files
      const formData = new FormData();
      formData.append('eventId', values.eventId);
      formData.append('eventName', values.eventName);
      formData.append('eventUrl', values.eventUrl);
      formData.append('description', values.description);
      formData.append('email', values.email);
      formData.append('startDate', values.startDate);
      formData.append('endDate', values.endDate);
      // Append other form data fields...

      // Append the logo image file (if present)
      if (values.logo instanceof File) {
        formData.append('logo', values.logo);
      }

      // Append the banner image file (if present)
      if (values.banner instanceof File) {
        formData.append('banner', values.banner);
      }

      // Get the authentication token from storage
      const token = localStorage.getItem('access_token');

      console.log(token)

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
      };

      // Make the API call to create the event using axios with the headers
      const response = await axios.post(
        'http://localhost:9003/admin/event/createEvent',
        formData,
        { headers }
      );

      console.log('Event created successfully!', response.data);
      window.location.href = '/dashboard/events';
      // Set the success status to true upon successful submission
      setSuccess('Event Created Successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      setErrors({ submitError: 'Failed to create event. Please try again later.' });
    } finally {
      // Set submitting to false to enable the form submit button
      setSubmitting(false);
    }
  };

  const eventSchema = Yup.object().shape({
    eventId: Yup.string().required('Event ID is required'),
    eventName: Yup.string().required('Event Name is required'),
    eventUrl: Yup.string().url('Invalid URL format').required('Event URL is required'),
    description: Yup.string().required('Description is required'),
    // email: Yup.string().required('email Id is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
    socialMediaLinks: Yup.object().shape({
      facebook: Yup.string().url('Invalid URL format').required('Facebook link is required'),
      twitter: Yup.string().url('Invalid URL format').required('Twitter link is required'),
      instagram: Yup.string().url('Invalid URL format').required('Instagram link is required'),
    }),
    logo: Yup.mixed().required('Logo is required'),
    banner: Yup.mixed().required('Banner is required'),
  });

  let inputOuter = "flex gap-1 flex-col w-[48%]"
  let inputRowBoxes = "flex justify-between items-center"
  let errorMessage = "text-red-600 font-[500] text-[12px]"

  return (
    <div className='fixed inset-0 flex justify-center items-center bg-white'>
      <div className='bg-white rounded-lg p-6 w-[80%]'>
        <div className='flex justify-between'>
          <Heading level='2'>Create/Edit Event</Heading>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            <XIcon className='w-5 h-5' />
          </button>
        </div>
        {/* Modal Boxes Outer */}
        <div className='flex justify-between mt-4'>
          {/* Form Display Area */}
          <div className='w-[59%] bg-[#F0F0F0] p-5 rounded-[8px]'>
            {/* Header */}
            <div className='flex justify-between h-[9vh] bg-[#E9E9E9]'>
              <div className='bg-[#E0E0E0] flex-col ixb-flex-both w-24'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM13 24C10.8244 24 8.69767 23.3549 6.88873 22.1462C5.07979 20.9375 3.66989 19.2195 2.83733 17.2095C2.00477 15.1995 1.78693 12.9878 2.21137 10.854C2.63581 8.72022 3.68345 6.7602 5.22183 5.22183C6.76021 3.68345 8.72022 2.6358 10.854 2.21136C12.9878 1.78692 15.1995 2.00476 17.2095 2.83733C19.2195 3.66989 20.9375 5.07979 22.1462 6.88873C23.3549 8.69767 24 10.8244 24 13C23.9967 15.9164 22.8367 18.7123 20.7745 20.7745C18.7123 22.8367 15.9164 23.9967 13 24ZM19 13C19 13.2652 18.8946 13.5196 18.7071 13.7071C18.5196 13.8946 18.2652 14 18 14H14V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V14H8.00001C7.73479 14 7.48044 13.8946 7.2929 13.7071C7.10536 13.5196 7.00001 13.2652 7.00001 13C7.00001 12.7348 7.10536 12.4804 7.2929 12.2929C7.48044 12.1054 7.73479 12 8.00001 12H12V8C12 7.73478 12.1054 7.48043 12.2929 7.29289C12.4804 7.10536 12.7348 7 13 7C13.2652 7 13.5196 7.10536 13.7071 7.29289C13.8946 7.48043 14 7.73478 14 8V12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13Z" fill="#2B2B2B" />
                </svg>
                <Heading level="5">Logo</Heading>
              </div>
              <div className='flex-col ixb-flex-both w-24'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM13 24C10.8244 24 8.69767 23.3549 6.88873 22.1462C5.07979 20.9375 3.66989 19.2195 2.83733 17.2095C2.00477 15.1995 1.78693 12.9878 2.21137 10.854C2.63581 8.72022 3.68345 6.7602 5.22183 5.22183C6.76021 3.68345 8.72022 2.6358 10.854 2.21136C12.9878 1.78692 15.1995 2.00476 17.2095 2.83733C19.2195 3.66989 20.9375 5.07979 22.1462 6.88873C23.3549 8.69767 24 10.8244 24 13C23.9967 15.9164 22.8367 18.7123 20.7745 20.7745C18.7123 22.8367 15.9164 23.9967 13 24ZM19 13C19 13.2652 18.8946 13.5196 18.7071 13.7071C18.5196 13.8946 18.2652 14 18 14H14V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V14H8.00001C7.73479 14 7.48044 13.8946 7.2929 13.7071C7.10536 13.5196 7.00001 13.2652 7.00001 13C7.00001 12.7348 7.10536 12.4804 7.2929 12.2929C7.48044 12.1054 7.73479 12 8.00001 12H12V8C12 7.73478 12.1054 7.48043 12.2929 7.29289C12.4804 7.10536 12.7348 7 13 7C13.2652 7 13.5196 7.10536 13.7071 7.29289C13.8946 7.48043 14 7.73478 14 8V12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13Z" fill="#2B2B2B" />
                </svg>
                <Heading level="5">Banner</Heading>
              </div>
            </div>
            {/* Form Content Area */}
            <div className="bg-white h-[63vh] ixb-flex-both">Show Form Content Here...</div>
            <Footer />
          </div>

          {/* Form Fields Area */}
          <div className='w-[39%] border p-5 rounded-[8px] border-[#A8A8A8]'>
            <Heading level='5'>Eventsdf Metadata</Heading>
            <div className='mt-3'>
              {/* <Createevent /> */}
              <div>
                <Formik initialValues={initialValues} validationSchema={eventSchema} onSubmit={handleSubmit}>
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="flex flex-col gap-[6px]">
                        <div className={inputRowBoxes}>
                          <div className={inputOuter}>
                            <label htmlFor="eventId">Event ID</label>
                            <Field component={Input} inputType="text" id="eventId" name="eventId" />
                            <ErrorMessage className={errorMessage} name="eventId" component="div" />
                          </div>
                          <div className={inputOuter}>
                            <label htmlFor="eventName">Event Name</label>
                            <Field component={Input} inputType="text" id="eventName" name="eventName" />
                            <ErrorMessage className={errorMessage} name="eventName" component="div" />
                          </div>
                        </div>
                        <div className={inputRowBoxes}>
                          <div className={inputOuter}>
                            <label htmlFor="startDate">Start Date:</label>
                            <Field component={Input} inputType="date" id="startDate" name="startDate" />
                            <ErrorMessage className={errorMessage} name="startDate" component="div" />
                          </div>
                          <div className={inputOuter}>
                            <label htmlFor="endDate">End Date:</label>
                            <Field component={Input} inputType="date" id="endDate" name="endDate" />
                            <ErrorMessage className={errorMessage} name="endDate" component="div" />
                          </div>
                        </div>
                        {/* Textarea */}
                        <div className="flex flex-col w-full gap-2">
                          <label htmlFor="description">Description</label>
                          <Field
                            as="textarea" // Use as="textarea" to render a textarea element
                            className="min-h-[150px] rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary outline-none"
                            id="description"
                            name="description"
                          />
                          <ErrorMessage className={errorMessage} name="description" component="div" />
                        </div>
                        {/*  */}
                        <div className={inputRowBoxes}>
                          <div className={inputOuter}>
                            <label htmlFor="socialMediaLinks.instagram">Instagram</label>
                            <Field component={Input} inputType="text" id="socialMediaLinks.instagram" name="socialMediaLinks.instagram" />
                            <ErrorMessage className={errorMessage} name="socialMediaLinks.instagram" component="div" />
                          </div>
                          <div className={inputOuter}>
                            <label htmlFor="socialMediaLinks.twitter">Twitter</label>
                            <Field component={Input} inputType="text" id="socialMediaLinks.twitter" name="socialMediaLinks.twitter" />
                            <ErrorMessage className={errorMessage} name="socialMediaLinks.twitter" component="div" />
                          </div>
                        </div>
                        <div className={inputRowBoxes}>
                          <div className={inputOuter}>
                            <label htmlFor="socialMediaLinks.facebook">Facebook</label>
                            <Field component={Input} inputType="text" id="socialMediaLinks.facebook" name="socialMediaLinks.facebook" />
                            <ErrorMessage className={errorMessage} name="socialMediaLinks.facebook" component="div" />
                          </div>
                          {/* <div className={inputOuter}>
                                    <label htmlFor="socialMediaLinks.facebook">Facebook</label>
                                    <Field component={Input} inputType="text" id="socialMediaLinks.facebook" name="socialMediaLinks.facebook" />
                                    <ErrorMessage className={errorMessage} name="socialMediaLinks.facebook" component="div" />
                                </div> */}
                        </div>
                        <div className="">
                          <label htmlFor="logo">Logo:</label>
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue('logo', event.currentTarget.files[0]);
                            }}
                          />
                          <ErrorMessage className={errorMessage} name="logo" component="div" />
                        </div>
                        <div className="">
                          <label htmlFor="banner">Banner:</label>
                          <input
                            type="file"
                            id="banner"
                            name="banner"
                            accept="image/*"
                            onChange={(event) => {
                              setFieldValue('banner', event.currentTarget.files[0]);
                            }}
                          />
                          <ErrorMessage className={errorMessage} name="banner" component="div" />
                        </div>
                        {/* ... (other form fields) ... */}

                        <div className="mt-5 flex justify-between">
                          {/* <Button
                                    customButtonStyle="w-[48%]"
                                    inputType="submit"
                                    variant="primary"
                                >
                                    Create Event
                                </Button> */}
                          <button type="submit">Save</button>
                          {/* <Button
                                    customButtonStyle="w-[48%] border-[1px] border-[#A8A8A8]"
                                    inputType="submit"  // Change inputType to "button"
                                    variant="secondary"
                                >
                                    Save and Exit
                                </Button> */}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
                <>{success}</>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth(EventFormModal)