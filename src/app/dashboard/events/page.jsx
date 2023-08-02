"use client";
// pages/events/index.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../../../components/auth/Auth'

const EventDetails = () => {
  const [data, setData] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get('http://192.168.200.42:9003/admin/event/fetchAllEvents', {
        headers: headers,
      });

      if (response.data.status === true) {
        setData(response.data.data);
      } else {
        console.error('Error fetching events:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`http://192.168.200.42:9003/admin/event/${eventId}`, {
        headers: headers,
      });

      if (response.data.status === true) {
        // Event successfully deleted, you can update the UI or fetch the events again to refresh the list
        fetchEvents();
      } else {
        console.error('Error deleting event:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {data.map((event) => (
          <li key={event.eventId}>
            {/* Use EventDetailsPage component in the Link */}
            <a href={`/dashboard/events/event?id=${event.eventId}`}>
              {/* <a> */}
                Event ID: {event.eventId}, Event Name: {event.name}, URL: {event.url}
              {/* </a> */}
            </a>
            <a href={`/dashboard/events/editEvent?id=${event.eventId}`}>
              Edit
            </a>
            <button onClick={() => handleDelete(event.eventId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auth(EventDetails);
