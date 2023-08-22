"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ViewSingleEvent = () => {
    const router = useRouter();
    const [event, setEvent] = useState(null);
    const eventId = router.query.id;

    useEffect(() => {
        if (!eventId) return;

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
                // Event successfully deleted, you can update the UI or fetch the events again to refresh the list
                // For now, let's redirect the user to the events list page after deleting the event
                router.push('/dashboard/events');
            } else {
                console.error('Error deleting event:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleEdit = () => {
        // Redirect the user to the EditEventPage with the eventId as a query parameter
        router.push(`/dashboard/events/editevent/${eventId}`);
    };

    return (
        <div>
            {event ? (
                <div key={event.eventId}>
                    <h1>Event Details</h1>
                    <p>Event ID: {event.eventId}</p>
                    <p>Event Name: {event.eventName}</p>
                    <p>Event URL: {event.eventUrl}</p>
                    <p>Description: {event.description}</p>
                    <p>Registered Participants: {event.registeredParticipants}</p>
                    <p>Start Date: {event.startDate}</p>
                    <p>End Date: {event.endDate}</p>
                    <p>Logo: {event.logo}</p>
                    <p>Banner: {event.banner}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => handleDelete(event.eventId)}>Delete</button>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ViewSingleEvent;
