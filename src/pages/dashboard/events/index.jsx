"use client";
// pages/events/index.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Auth from '../../../components/auth/Auth'
import Link from 'next/link';
import Button from '@/components/atoms/Button';

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
            <h1 className='bg-[#000]'>Events</h1>
            <Button href="/dashboard" variant="primary">Dashboard</Button>
            <br />
            <br />
            <Button href="/dashboard/createevent" variant="primary">Create Event</Button>
            <ul>
                {data.map((event) => (
                    <li key={event.eventId}>
                        <Link href={`/dashboard/events/eventdetails/${event.eventId}`}>
                            <>
                                Event ID: {event.eventId}, Event Name: {event.name}, URL: {event.url}
                            </>
                        </Link>
                        <button onClick={() => handleDelete(event.eventId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Auth(EventDetails);
