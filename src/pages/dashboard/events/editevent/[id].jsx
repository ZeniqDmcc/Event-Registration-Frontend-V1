"use client"
// pages/dashboard/events/edit/EditEventPage.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const EditEventPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    eventName: '',
    eventUrl: '',
    description: '',
    registeredParticipants: 0,
    startDate: '',
    endDate: '',
    logo: '',
    banner: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`http://192.168.200.42:9003/admin/event/${id}`, {
          headers: headers,
        });

        if (response.data.status === true) {
          setFormData(response.data.data);
        } else {
          console.error('Error fetching event:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Assuming only one file is uploaded, you can handle multiple files if needed
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // Get the base64 encoded data URL of the image
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(`http://192.168.200.42:9003/admin/event/${id}`, formData, {
        headers: headers,
      });

      if (response.data.status === true) {
        // Event successfully updated, you can update the UI or redirect to the event details page
        router.push(`/dashboard/events/eventdetails/${id}`);
      } else {
        console.error('Error updating event:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };


  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} />
        </div>
        <div>
          <label>Event URL:</label>
          <input type="text" name="eventUrl" value={formData.eventUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Registered Participants:</label>
          <input
            type="number"
            name="registeredParticipants"
            value={formData.registeredParticipants}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" name="logo" accept="image/*" onChange={handleImageUpload} />
          {formData.logo && <img src={formData.logo} alt="Logo Preview" />}
        </div>
        <div>
          <label>Banner:</label>
          <input type="file" name="banner" accept="image/*" onChange={handleImageUpload} />
          {formData.banner && <img src={formData.banner} alt="Banner Preview" />}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditEventPage;
