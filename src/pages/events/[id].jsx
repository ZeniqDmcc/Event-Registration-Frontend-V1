import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "@/../../globals.css"
import SiteFooter from "@/components/template/SiteFooter";
import SiteHeader from "@/components/template/SiteHeader";
import Footer from "@/components/template/Footer";
import Button from "@/components/atoms/Button";

const EventDetailsForUser = ({ onClose }) => {
    const router = useRouter();
    const { id } = router.query;
    const [event, setEvent] = useState(null);
    const [formID, setFormID] = useState();
    const [form, setForm] = useState();
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        if (!id) return;
        console.log(id);

        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                    `http://localhost:9003/admin/event/${id}`,
                    {
                        headers: headers,
                    }
                )
                console.log("response.data.status", response.data.data)
                if (response.data.status === true) {
                    setEvent(response.data.data)
                    setFormID(response.data.data.formId)
                } else {
                    console.error("Error fetching event:", response.data.error)
                }
            } catch (error) {
                console.error("Error fetching event:", error)
            }
        }

        fetchEvent()
    }, [id])

    useEffect(() => {
        const fetchform = async () => {
            try {
                const token = localStorage.getItem("access_token")
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get(
                    `http://localhost:9003/admin/form/${formID}`,
                    {
                        headers: headers,
                    }
                )
                console.log(
                    "response.data.status.forms---------------------",
                    response.data.data.formFields
                )
                if (response.data.status === true) {
                    setForm(response.data.data)
                } else {
                    console.error("Error fetching event:", response.data.error);
                }
            } catch (error) {
                console.error("Error fetching event:", error)
            }
        }

        fetchform()
    }, [formID])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post('http://localhost:9003/admin/form/submit', formValues, {
                headers: headers,
            });

            if (response.data.status === true) {
                console.log('Form submitted successfully:', response.data.data);
            } else {
                console.error('Error submitting form:', response.data.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            {/* Header */}

            <SiteHeader />

            {/* Content */}

            <div className="">
                {/* Header */}
                <div className="flex items-center justify-center py-20">
                    <div className="w-full max-w-[1216px]">
                        {event ? (
                            <div key={event.eventId}>
                                <div className="border border-[#A8A8A8] shadow-md">
                                    <div className="border-b border-[#A8A8A8]">
                                        <div className="flex border-b border-[#A8A8A8]">
                                            <div className="w-[13%] h-[151px] overflow-hidden">
                                                <img src={event.logo} alt="Event-logo" />
                                            </div>
                                            <div className="w-[87%] h-[151px] overflow-hidden">
                                                <img width="100%" src={event.banner} />
                                            </div>
                                        </div>
                                        <div className="text-center px-14">
                                            <Heading
                                                className="justify-center pt-8 pb-6 text-center"
                                                level="1"
                                            >
                                                {event.eventName}
                                            </Heading>
                                            <p className="pb-10 leading-[28px] text-xl tracking-[1px]">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Form */}
                                    <div className=" mx-auto max-w-[618px] px-6">
                                        {form ? (
                                            <div key={form.formId}>
                                                <div className="">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className=" mx-auto py-12 lg:py-20 flex flex-col gap-7">
                                                            {form.formFields.map((field, index) => (
                                                                <div key={index}>
                                                                    {field.fieldType === "text" && (
                                                                        <div className="flex flex-col gap-3 max-w-[309px]">
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                            <Input
                                                                                type="text"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {field.fieldType === "textarea" && (
                                                                        <div className="flex flex-col">
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                            <textarea
                                                                                className="shadow-md p-4 border w-[618px] rounded-[4px] h-[139px]"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {field.fieldType === "checkbox" && (
                                                                        <div className="flex items-center gap-3">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                    {field.fieldType === "radio" && (
                                                                        <div className="flex flex-col">
                                                                            <label>{field.fieldLabel}</label>
                                                                            <div className="flex gap-3 pt-3">
                                                                                {field.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex}>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={field.fieldName}
                                                                                            value={option}
                                                                                            onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                                        />
                                                                                        <label>{option}</label>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}


                                                                    {field.fieldType === "select" && (
                                                                        <div className="flex flex-col">
                                                                            <label htmlFor={field.fieldName}>{field.fieldLabel}</label>
                                                                            <select
                                                                                className="border mt-3 border-[#E0E0E0] shadow-md h-[44px] p-2 rounded-[4px]"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                value={formValues[field.fieldName] || ''}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            >
                                                                                {Array.isArray(field.options) && field.options.map((option, optionIndex) => (
                                                                                    <option key={optionIndex} value={option}>
                                                                                        {option}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    )}

                                                                    {field.fieldType === "date" && (
                                                                        <div className="flex flex-col">
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                            <input
                                                                                className="border border-[#E0E0E0] h-[44px] rounded-[4px] p-2 mt-2 shadow-md"
                                                                                type="date"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {field.fieldType === "file" && (
                                                                        <div className="flex flex-col gap-2">
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                            <input
                                                                                type="file"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                accept="image/*"
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    {field.fieldType === "tandc" && (
                                                                        <div className="flex flex-col justify-start">
                                                                            <input
                                                                                type="checkbox"
                                                                                id={field.fieldName}
                                                                                name={field.fieldName}
                                                                                onChange={(e) => setFormValues({ ...formValues, [field.fieldName]: e.target.value })}
                                                                            />
                                                                            <label htmlFor={field.fieldName}>
                                                                                {field.fieldLabel}
                                                                            </label>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            <Button customButtonStyle="max-w-[300px]" variant='primary'>Submit</Button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </div>
                                    <Footer />
                                </div>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
                {/* Footer */}
            </div>

            {/* Footer */}
            <SiteFooter />
        </>
    );

};

export default EventDetailsForUser;
