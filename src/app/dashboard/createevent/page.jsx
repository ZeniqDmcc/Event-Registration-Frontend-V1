"use client"
import Auth from "../../../components/auth/Auth"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from "react";

const CreateEventPage = () => {

    const [success, setSuccess] = useState('')

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
        logo: '',
        banner: '',
    };


    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            console.log(values)
          // Get the authentication token from storage
          const token = localStorage.getItem('access_token');
      
          // Include the token in the request headers
          const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Add this line to set Content-Type to JSON
          };
      
          // Make the API call to create the event using axios
          const response = await axios.post(
            'http://192.168.200.42:9003/admin/event/createEvent',
            values,
            { headers }
          );
      
          console.log('Event created successfully!', response.data);
      
          // Set the success status to true upon successful submission
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

    return (
        <div>
            <h1>Create Event</h1>
            <Formik initialValues={initialValues} validationSchema={eventSchema} onSubmit={handleSubmit}>
                <Form>
                    <div>
                        <label htmlFor="eventId">Event ID:</label>
                        <Field type="text" id="eventId" name="eventId" />
                        <ErrorMessage name="eventId" component="div" />
                    </div>
                    <div>
                        <label htmlFor="eventName">Event Name:</label>
                        <Field type="text" id="eventName" name="eventName" />
                        <ErrorMessage name="eventName" component="div" />
                    </div>
                    <div>
                        <label htmlFor="eventUrl">Event URL:</label>
                        <Field type="text" id="eventUrl" name="eventUrl" />
                        <ErrorMessage name="eventUrl" component="div" />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <Field as="textarea" id="description" name="description" />
                        <ErrorMessage name="description" component="div" />
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date:</label>
                        <Field type="date" id="startDate" name="startDate" />
                        <ErrorMessage name="startDate" component="div" />
                    </div>
                    <div>
                        <label htmlFor="endDate">End Date:</label>
                        <Field type="date" id="endDate" name="endDate" />
                        <ErrorMessage name="endDate" component="div" />
                    </div>
                    <div>
                        <label htmlFor="socialMediaLinks.facebook">Facebook Link:</label>
                        <Field type="text" id="socialMediaLinks.facebook" name="socialMediaLinks.facebook" />
                        <ErrorMessage name="socialMediaLinks.facebook" component="div" />
                    </div>
                    <div>
                        <label htmlFor="socialMediaLinks.twitter">Twitter Link:</label>
                        <Field type="text" id="socialMediaLinks.twitter" name="socialMediaLinks.twitter" />
                        <ErrorMessage name="socialMediaLinks.twitter" component="div" />
                    </div>
                    <div>
                        <label htmlFor="socialMediaLinks.instagram">Instagram Link:</label>
                        <Field type="text" id="socialMediaLinks.instagram" name="socialMediaLinks.instagram" />
                        <ErrorMessage name="socialMediaLinks.instagram" component="div" />
                    </div>
                    <div>
                        <label htmlFor="logo">Logo:</label>
                        <Field type="file" id="logo" name="logo" />
                        <ErrorMessage name="logo" component="div" />
                    </div>
                    <div>
                        <label htmlFor="banner">Banner:</label>
                        <Field type="file" id="banner" name="banner" />
                        <ErrorMessage name="banner" component="div" />
                    </div>
                    
                    <button type="submit">Create Event</button>
                </Form>
            </Formik>
            <>{success}</>
        </div>
    )
};

export default Auth(CreateEventPage);