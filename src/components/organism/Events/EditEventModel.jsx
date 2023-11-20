import React, { useState, useEffect } from "react";
import axios from "axios";
import { XIcon } from "@heroicons/react/solid";
import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const EditEventModel = ({ onClose, eventId }) => {
  const [eventData, seteventData] = useState({
    eventName: "",
    eventUrl: "",
    description: "",
    registeredParticipants: 0,
    startDate: "",
    endDate: "",
    logo: "",
    banner: "",
  });

  useEffect(() => {
    if (!eventId) return;

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

        if (response.data.status === true) {
          seteventData(response.data.data);
        } else {
          console.error("Error fetching event:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteventData((preveventData) => ({
      ...preveventData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        seteventData((preveventData) => ({
          ...preveventData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:9003/admin/event/${eventId}`,
        eventData,
        {
          headers: headers,
        }
      );

      if (response.data.status === true) {
        // Event successfully updated, you can update the UI or take any necessary action
        onClose(); // Close the edit modal after successful edit
      } else {
        console.error("Error updating event:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const fieldOuter = "flex flex-col gap-3"

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-scroll bg-white">
      <div className="bg-white rounded-lg p-6 w-[60%] mt-36 pb-20">
        <div className="flex justify-between mb-4">
          <Heading level="2">Edit Event</Heading>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit}>
          <div className="px-10 py-20 border shadow-md">
            <div className="w-[80%] flex flex-col gap-8 mx-auto">
              <div className={fieldOuter}>
                <label>Event Name</label>
                <Input
                  type="text"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>Event URL</label>
                <Input
                  type="text"
                  name="eventUrl"
                  value={eventData.eventUrl}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>Description</label>
                <textarea
                  className="h-48 p-3 rounded-[4px] border shadow-md"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>Registered Participants</label>
                <Input
                  type="number"
                  name="registeredParticipants"
                  value={eventData.registeredParticipants}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                />
              </div>
              <div className={fieldOuter}>
                <label>Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {eventData.logo && (
                  <img width="200" src={eventData.logo} alt="Logo Preview" />
                )}
              </div>
              <div className={fieldOuter}>
                <label>Banner</label>
                <input
                  type="file"
                  name="banner"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {eventData.banner && (
                  <img
                    width="200"
                    src={eventData.banner}
                    alt="Banner Preview"
                  />
                )}
              </div>
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModel;
