"use client";
import { XIcon } from "@heroicons/react/solid";
import Heading from "../../atoms/Heading";
import Footer from "../../template/Footer";
import Input from "@/components/atoms/Input";
import Auth from "@/components/auth/Auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Axios from "axios";
import Button from "@/components/atoms/Button";
import { CameraIcon } from "@heroicons/react/solid";

const EventFormModal = ({ onClose }) => {
  const [success, setSuccess] = useState("")
  const [logoFile, setLogoFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const [getID, setGetID] = useState()

  const initialValues = {
    eventId: "",
    eventName: "",
    eventUrl: "",
    description: "",
    startDate: "",
    endDate: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
    logo: null,
    banner: null,
    formId: "",
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // console.log(values)

      const formData = new FormData();
      formData.append("eventId", values.eventId);
      formData.append("eventName", values.eventName);
      formData.append("eventUrl", values.eventUrl);
      formData.append("description", values.description);
      formData.append("email", values.email);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);

      if (values.logo instanceof File) {
        formData.append("logo", values.logo);
      }

      if (values.banner instanceof File) {
        formData.append("banner", values.banner);
      }

      formData.append("formId", getID);

      const token = localStorage.getItem("access_token");

      console.log(token);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await Axios.post(
        "http://localhost:9003/admin/event/createEvent",
        formData,
        { headers }
      );

      console.log("Event created successfully!", response.data);
      window.location.href = "/dashboard";
      setSuccess("Event Created Successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors({
        submitError: "Failed to create event. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const eventSchema = Yup.object().shape({
    eventId: Yup.string().required("Event ID is required"),
    eventName: Yup.string().required("Event Name is required"),
    eventUrl: Yup.string()
      .url("Invalid URL format")
      .required("Event URL is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End Date must be after Start Date"),
    socialMediaLinks: Yup.object().shape({
      facebook: Yup.string()
        .url("Invalid URL format")
        .required("Facebook link is required"),
      twitter: Yup.string()
        .url("Invalid URL format")
        .required("Twitter link is required"),
      instagram: Yup.string()
        .url("Invalid URL format")
        .required("Instagram link is required"),
    }),
    logo: Yup.mixed().required("Logo is required"),
    banner: Yup.mixed().required("Banner is required"),
    formId: Yup.string(),
  })

  let inputOuter = "flex gap-1 flex-col w-[48%]";
  let inputRowBoxes = "flex justify-between items-center";
  let errorMessage = "text-red-600 font-[500] text-[12px]";

  //Form function
  function FormList({ onFormSelect }) {
    const [formDataID, setFormDataID] = useState([]);
    const [selectedFormId, setSelectedFormId] = useState();
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      fetchFormID();
    }, []);
  
    const fetchFormID = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        const response = await Axios.get(
          "http://localhost:9003/admin/form/allForms",
          {
            headers: headers,
          }
        );
  
        if (response.data.status === true) {
          setFormDataID(response.data.data);
        } else {
          console.error("Error fetching forms:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
  
    const openForm = () => {
      setShow(true);
    };
  
    return (
      <div className="flex flex-col items-center justify-center bg-white">
        <Button customButtonStyle="w-full" type="button" onClick={openForm} variant="primary">
          Assign form to this event
        </Button>
  
        {show && (
          <><select
            className="w-full p-2 rounded-[4px] h-[40px] mt-4 border-2"
            onChange={(e) => {
              setSelectedFormId(e.target.value);
              setGetID(e.target.value); // Set getID when an option is selected
            }}
  
            onClick={openForm}
          >
          <option value="" disabled hidden>
            List...
          </option>
            {formDataID.map((item) => (
              <option key={item.formId} value={item.formId}>
                {item.formId}
              </option>
            ))}
          </select>
          </>
        )}
      </div>
    );
  }

  console.log("Get ID", getID)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="rounded-lg p-6 w-[80%] overflow-scroll h-[80vh]">
        <div className="flex justify-between">
          <Heading level="2">Create/Edit Event</Heading>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <div className="w-[59%] bg-[#F0F0F0] p-5 rounded-[8px]">
            {/* Header */}
            <div className="flex justify-between h-[9vh] ">
              <div className="bg-[#E0E0E0] flex-col ixb-flex-both w-[12%]">
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="bg-[#E9E9E9] w-full flex items-center justify-center h-[100vh]">
                    <Heading level="5">Logo</Heading>
                  </div>
                )}
              </div>

              <div className="bg-[#E0E0E0] flex-col ixb-flex-both w-[88%]">
                {bannerFile ? (
                  <img
                    src={URL.createObjectURL(bannerFile)}
                    alt="Banner"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Heading level="5">Banner</Heading>
                )}
              </div>
            </div>
            <Footer />
          </div>
          {/* Form Fields Area */}
          <div className="w-[39%] border p-5 rounded-[8px] border-[#A8A8A8]">
            <Heading level="5">Event Metadata</Heading>
            <div className="mt-3">
              {/* <Createevent /> */}
              <div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={eventSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue }) => (
                    <Form className="flex flex-col gap-4">
                      <div className={inputRowBoxes}>
                        <div className={inputOuter}>
                          <label htmlFor="eventId">Event ID</label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="eventId"
                            name="eventId"
                          />
                          <ErrorMessage name="eventId" component="div" />
                        </div>

                        <div className={inputOuter}>
                          <label htmlFor="eventName">Event Name</label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="eventName"
                            name="eventName"
                          />
                          <ErrorMessage name="eventName" component="div" />
                        </div>
                      </div>

                      <div className={inputRowBoxes}>
                        <div className={inputOuter}>
                          <label htmlFor="startDate">Start Date</label>
                          <Field
                            component={Input}
                            inputType="date"
                            id="startDate"
                            name="startDate"
                          />
                          <ErrorMessage name="startDate" component="div" />
                        </div>

                        <div className={inputOuter}>
                          <label htmlFor="endDate">End Date</label>
                          <Field
                            component={Input}
                            inputType="date"
                            id="endDate"
                            name="endDate"
                          />
                          <ErrorMessage name="endDate" component="div" />
                        </div>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <label htmlFor="description">Description</label>
                        <Field
                          as="textarea" // Use as="textarea" to render a textarea element
                          className="min-h-[150px] rounded-[3px] border p-[10px] text-[16px] text-textColor border-inBorder bg-white shadow-primary outline-none"
                          id="description"
                          name="description"
                        />
                        <ErrorMessage
                          className={errorMessage}
                          name="description"
                          component="div"
                        />
                      </div>

                      <div className={inputRowBoxes}>
                        <div className={inputOuter}>
                          <label htmlFor="socialMediaLinks.instagram">
                            Instagram Link
                          </label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="socialMediaLinks.instagram"
                            name="socialMediaLinks.instagram"
                          />
                          <ErrorMessage
                            name="socialMediaLinks.instagram"
                            component="div"
                          />
                        </div>

                        <div className={inputOuter}>
                          <label htmlFor="socialMediaLinks.twitter">
                            Twitter Link
                          </label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="socialMediaLinks.twitter"
                            name="socialMediaLinks.twitter"
                          />
                          <ErrorMessage
                            name="socialMediaLinks.twitter"
                            component="div"
                          />
                        </div>
                      </div>

                      <div className={inputRowBoxes}>
                        <div className={inputOuter}>
                          <label htmlFor="socialMediaLinks.facebook">
                            Facebook Link
                          </label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="socialMediaLinks.facebook"
                            name="socialMediaLinks.facebook"
                          />
                          <ErrorMessage
                            name="socialMediaLinks.facebook"
                            component="div"
                          />
                        </div>

                        <div className={inputOuter}>
                          <label htmlFor="eventUrl">Event URL</label>
                          <Field
                            component={Input}
                            inputType="text"
                            id="eventUrl"
                            name="eventUrl"
                          />
                          <ErrorMessage name="eventUrl" component="div" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-5 py-3">
                        <div className="">
                          <label className="items-center gap-2" htmlFor="logo">
                            Logo
                          </label>
                          {/* <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            className=''
                            onChange={(event) => {
                              setFieldValue('logo', event.currentTarget.files[0]);
                            }}
                          /> */}
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            className=""
                            onChange={(event) => {
                              setFieldValue(
                                "logo",
                                event.currentTarget.files[0]
                              );
                              setLogoFile(event.currentTarget.files[0]);
                            }}
                          />
                          <ErrorMessage name="logo" component="div" />
                        </div>

                        <div className="">
                          <label className="" htmlFor="banner">
                            Banner
                          </label>
                          {/* <input
                            type="file"
                            id="banner"
                            name="banner"
                            accept="image/*"
                            className=''
                            onChange={(event) => {
                              setFieldValue('banner', event.currentTarget.files[0]);
                            }}
                          /> */}
                          <input
                            type="file"
                            id="banner"
                            name="banner"
                            accept="image/*"
                            className=""
                            onChange={(event) => {
                              setFieldValue(
                                "banner",
                                event.currentTarget.files[0]
                              );
                              setBannerFile(event.currentTarget.files[0]);
                            }}
                          />
                          <ErrorMessage name="banner" component="div" />
                        </div>
                      </div>
                      <FormList />
                      {/* <div className="flex items-center justify-around py-3">
                        <div className="text-center">
                          <label className='flex flex-col items-center gap-2' htmlFor="logo">Logo
                            <CameraIcon className="w-[50px] h-[50px]" />
                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            className='hidden'
                            onChange={(event) => {
                              setFieldValue('logo', event.currentTarget.files[0]);
                            }}
                          />
                          </label>
                          <ErrorMessage name="logo" component="div" />
                        </div>

                        <div className="flex text-center">
                          <label className='flex flex-col items-center gap-3' htmlFor="banner">Banner
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" width='40px' viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
                          
                          <input
                            type="file"
                            id="banner"
                            name="banner"
                            accept="image/*"
                            className='hidden'
                            onChange={(event) => {
                              setFieldValue('banner', event.currentTarget.files[0]);
                            }}
                          />
                          </label>
                          <ErrorMessage name="banner" component="div" />
                        </div>
                      </div> */}

                      <div className="flex justify-between">
                        <Button
                          customButtonStyle="w-[60%]"
                          inputType="submit"
                          variant="primary"
                        >
                          Save and create a form
                        </Button>
                        <Button
                          customButtonStyle="border w-[36%]"
                          inputType="submit"
                          variant="secondary"
                        >
                          Save and Exit
                        </Button>
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

export default Auth(EventFormModal);