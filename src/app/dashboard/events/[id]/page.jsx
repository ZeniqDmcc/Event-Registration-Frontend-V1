"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../../../../components/auth/Auth';

const EventDetailsPage = () => {
  const [data, setData] = useState([]);

  // const fetchEvents = async () => {
  //   try {
  //     const token = localStorage.getItem('access_token');
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.get('http://192.168.200.42:9003/admin/event/fetchAllEvents', {
  //       headers: headers,
  //     });

  //     if (response.data.status === true) {
  //       setData(response.data.data);
  //     } else {
  //       console.error('Error fetching events:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const handleDelete = async (eventId) => {
  //   try {
  //     const token = localStorage.getItem('access_token');
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.delete(`http://192.168.200.42:9003/admin/event/${eventId}`, {
  //       headers: headers,
  //     });

  //     if (response.data.status === true) {
  //       // Event successfully deleted, you can update the UI or fetch the events again to refresh the list
  //       fetchEvents();
  //     } else {
  //       console.error('Error deleting event:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting event:', error);
  //   }
  // };

  return (
    <div>
      <h1>Single Events</h1>
      {/* <ul>
        {data.map((event) => (
          <li key={event.eventId}>
            <a href={`/dashboard/events/${event.eventId}`}>
              Event ID: {event.eventId}, Event Name: {event.name}, URL: {event.url}
            </a>
            <button onClick={() => handleDelete(event.eventId)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Auth(EventDetailsPage);
