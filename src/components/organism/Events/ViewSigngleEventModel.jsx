import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";
import Heading from "@/components/atoms/Heading";
import Footer from "@/components/template/Footer";
import Button from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/paragraph";
import Input from "@/components/atoms/Input";

const ViewSigngleEventModel = ({ onClose, eventId }) => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [formID, setFormID] = useState();
  const [form, setForm] = useState();

  useEffect(() => {
    if (!eventId) return;
    console.log(eventId);

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:9003/admin/event/${eventId}`,
          {
            headers: headers,
          }
        );
        console.log("response.data.status", response.data.data);
        if (response.data.status === true) {
          setEvent(response.data.data);
          setFormID(response.data.data.formId);
        } else {
          console.error("Error fetching event:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchform = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `http://localhost:9003/admin/form/${formID}`,
          {
            headers: headers,
          }
        );
        console.log(
          "response.data.status.forms---------------------",
          response.data.data.formFields
        );
        if (response.data.status === true) {
          setForm(response.data.data);
          // setFormID(response.data.data.formId)
        } else {
          console.error("Error fetching event:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchform();
  }, [formID]);

  console.log("Form ID", formID);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `http://localhost:9003/admin/event/${eventId}`,
        {
          headers: headers,
        }
      );

      if (response.data.status === true) {
        router.push("/dashboard/events");
      } else {
        console.error("Error deleting event:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/events/editevent/${eventId}`);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg px-6 w-[80%] h-[80vh] overflow-y-scroll">
        {event ? (
          <div key={event.eventId}>
            <div className="flex justify-between">
              <Heading level="1">{event.eventId}</Heading>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-[#A8A8A8] shadow-md relative mt-4">
              <div className="border-b border-[#A8A8A8]">
                <div className="flex">
                  <div className="w-[151px] h-[151px] overflow-hidden">
                    <img src={event.logo} alt="Event-logo" />
                  </div>
                  <div className="w-full h-[151px] overflow-hidden">
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
                  <p className="pb-10 leading-[28px] text-xl font-lCreate New Event
ight tracking-[1px]">
                    {event.description}
                  </p>
                </div>
              </div>
              {/* Form */}
              <div className="bg-white mx-auto px-6 w-[70%] overflow-y-auto">
                {form ? (
                  <div key={form.formId}>
                    <div className="">
                      <form>
                        <div className="w-[60%] mx-auto py-12 flex flex-col gap-7">
                          {form.formFields.map((field, index) => (
                            <div key={index}>
                              {field.fieldType === "text" && (
                                <div className="flex flex-col w-[60%] gap-3">
                                  <label htmlFor={field.fieldName}>
                                    {field.fieldLabel}
                                  </label>
                                  <Input
                                    type="text"
                                    id={field.fieldName}
                                    name={field.fieldName}
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
                                  />
                                </div>
                              )}
                              {field.fieldType === "checkbox" && (
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    id={field.fieldName}
                                    name={field.fieldName}
                                  />
                                  <label htmlFor={field.fieldName}>
                                    {field.fieldLabel}
                                  </label>
                                </div>
                              )}
                              {field.fieldType === "radio" && (
                                <div className="flex flex-col">
                                  <label>{field.fieldLabel}</label>
                                  {/* {Array.isArray(field.options) && ((option, optionIndex) => (
                                                        <div key={optionIndex}>
                                                            <input
                                                                type="radio"
                                                                id={`${field.fieldName}_${optionIndex}`}
                                                                name={field.fieldName}
                                                                value={option}
                                                            />
                                                            <label htmlFor={`${field.fieldName}_${optionIndex}`}>{option}</label>
                                                        </div>
                                                    ))} */}

                                  <div className="flex gap-3 pt-3">
                                    <input type="radio" name="option" />
                                    <br />
                                    <input type="radio" name="option" />
                                  </div>
                                </div>
                              )}

                              {field.fieldType === "select" && (
                                <div className="flex flex-col">
                                  <label htmlFor={field.fieldName}>
                                    {field.fieldLabel}
                                  </label>
                                  <select
                                    className="border mt-3 border-[#E0E0E0] shadow-md h-[44px] p-2 rounded-[4px]"
                                    id={field.fieldName}
                                    name={field.fieldName}
                                  >
                                    {Array.isArray(field.options) &&
                                      ((option, optionIndex) => (
                                        <option
                                          key={optionIndex}
                                          value={option}
                                        >
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
                                  />
                                </div>
                              )}
                              {field.fieldType === "tandc" && (
                                <div className="flex flex-col justify-start">
                                  <input
                                    type="checkbox"
                                    id={field.fieldName}
                                    name={field.fieldName}
                                  />
                                  <label htmlFor={field.fieldName}>
                                    {field.fieldLabel}
                                  </label>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                    {/* Buttons */}
                    {/* <div className="flex gap-4">
                            <Button variant="primary" onClick={handleEdit}>Edit</Button>
                            <Button variant="secondary" onClick={() => handleDelete(formId)}>Delete</Button>
                        </div> */}
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="w-full">
                {/* Footer */}
                <Footer />
              </div>
            </div>

            {/* Buttons */}
            {/* <div className="flex gap-4">
              <Button variant="primary" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleDelete(event.eventId)}
              >
                Delete
              </Button>
            </div> */}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ViewSigngleEventModel;
