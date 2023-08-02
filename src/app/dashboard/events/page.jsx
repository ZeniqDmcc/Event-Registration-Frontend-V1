"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const EventDetailsPage = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const eventId = router.query.id;
    
  useEffect(() => {

    console.log("he", eventId)
    if (!eventId) return; // Return early if eventId is not available yet

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`http://192.168.200.42:9003/admin/event/${eventId}`, {
          headers: headers,
        });

        if (response.data.status === true) {
          setData(response.data.data);
        } else {
          console.error('Error fetching event:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Conditional rendering to handle the case when eventId is not available
  if (!eventId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Event Details</h1>
      <p>Event ID: {data.eventId}</p>
      <p>Event Name: {data.eventName}</p>
      <p>Event URL: {data.eventUrl}</p>
      {/* Render other event details */}
    </div>
  );
};

export default EventDetailsPage;
