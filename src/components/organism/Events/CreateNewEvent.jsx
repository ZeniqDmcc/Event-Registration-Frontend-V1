"use client"
import Auth from "@/components/auth/Auth"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from "react";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const CreateNewEvent = ({ handleSubmit }) => {

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

    handleSubmit = async (values, { setSubmitting, setErrors }) => {
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
    )
};

export default CreateNewEvent;