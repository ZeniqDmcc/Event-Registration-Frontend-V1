import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useRouter } from 'next/router';
import Heading from '@/components/atoms/Heading';
import Footer from '@/components/template/Footer';
import Button from '@/components/atoms/Button';

const ViewSigngleEventModel = ({ onClose, eventId }) => {
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    console.log(eventId)

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`http://localhost:9003/admin/event/${eventId}`, {
          headers: headers,
        });

        if (response.data.status === true) {
          setEvent(response.data.data);
        } else {
          console.error('Error fetching event:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`http://localhost:9003/admin/event/${eventId}`, {
        headers: headers,
      });

      if (response.data.status === true) {
        router.push('/dashboard/events');
      } else {
        console.error('Error deleting event:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/dashboard/events/editevent/${eventId}`);
  };

  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center bg-white'>
      <div className='bg-white rounded-lg px-6 w-[80%] h-[80vh] overflow-y-scroll'>
        {event ? (
          <div key={event.eventId}>
            <div className='flex justify-between'>
              <Heading level="1">{event.eventId}</Heading>
              <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
                <XIcon className='w-5 h-5' />
              </button>
            </div>
            <div className="flex">
              <div className="w-[151px] h-[151px] overflow-hidden">
                <img src={event.logo} alt="Event-logo" />
              </div>
              <div className="w-full h-[151px] overflow-hidden">
                <img src={event.banner} />
              </div>
            </div>
            <div className="">
              <p>Event ID: {event.eventId}</p>
              <p>Description: {event.description}</p>
            </div>
            <Footer />
            {/* Buttons */}
            <div className="flex gap-4">
            <Button variant="primary" onClick={handleEdit}>Edit</Button>
            <Button variant="secondary" onClick={() => handleDelete(event.eventId)}>Delete</Button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ViewSigngleEventModel;
