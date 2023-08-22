"use client"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Label from '@/components/atoms/Label';
import "@/../../globals.css"
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import FormValidationMessage from '@/components/atoms/FormValidationMessage';
import Heading from '@/components/atoms/Heading';

function LoginPage() {

    let formOuter = 'lg:w-[392px] mx-auto rounded-[8px] bg-white shadow-md p-10 h-[632px]'
    let formInnerStyle = 'ixb-flex-col gap-7 pt-5'
    let inputOuter = 'ixb-flex-col gap-2'

    const [loginError, setLoginError] = useState('');

    const handleFormSubmit = async (values) => {
        try {
            console.log(values)
            const response = await axios.post('http://localhost:9003/admin/loginAdmin', values);
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
        <div className='ixb-flex-align h-[100vh]'>
            <div className={formOuter}>
                <div className='text-center'>
                    <Heading level='1'>Admin Login</Heading>
                </div>
                <Formik
                    initialValues={{ userId: '', password: '' }}
                    onSubmit={handleFormSubmit}
                >
                    <Form>
                        <div className={formInnerStyle}>
                            <div className={inputOuter}>
                                <Label htmlFor="userId">Admin ID</Label>
                                <Field component={Input} inputType="text" id="user" name="userId" />
                            </div>
                            <div className={inputOuter}>
                                <Label htmlFor="password">Password</Label>
                                <Field component={Input}  inputType="password" id="password" name="password" />
                            </div>
                            <ErrorMessage name="userId" component="div" />
                            <ErrorMessage name="password" component="div" />
                            <div>
                                {loginError && <div><FormValidationMessage type='error' message={loginError} /></div>}
                            </div>
                            <Button variant="primary">Login</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage