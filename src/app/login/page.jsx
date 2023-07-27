"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

function LoginPage() {

    const [loginError, setLoginError] = useState('');

    const handleFormSubmit = async (values) => {
        try {
            const response = await axios.post('http://192.168.200.42:9003/admin/loginAdmin', values);
            const token = response.data.data;

            // Store the JWT token in localStorage with the key "access_token"
            localStorage.setItem('access_token', token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.errors) {
                setLoginError(error.response.data.errors);
            } else {
                setLoginError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{ userId: '', password: '' }} // Corrected from "userId" to "userId"
                onSubmit={handleFormSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="user">User ID:</label>
                        <Field type="text" id="user" name="userId" /> {/* Corrected from "userId" to "userId" */}
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" id="password" name="password" />
                    </div>
                    <ErrorMessage name="userId" component="div" /> {/* Corrected from "user" to "userId" */}
                    <ErrorMessage name="password" component="div" />
                    <div>
                        {loginError && <div>{loginError}</div>}
                    </div>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginPage