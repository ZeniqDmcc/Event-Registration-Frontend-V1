import Button from '../../atoms/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

function EventHover({ Delete, ViewEvent, EditEvent, eventId, onClose, Publish }) {
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false)

    const handlePublishClick = () => {
        Publish(eventId);
        setIsPublished((prevIsPublished) => !prevIsPublished);
    };

    useEffect(() => {
        const fetchInitialVisibility = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await axios.get('http://localhost:9003/admin/event/fetchAllEvents/', {
                    headers: headers,
                });

                if (response.data.status === true) {
                    // console.log('Check all the visibility:', response.data.data);

                    // Find the event with the matching eventId
                    const event = response.data.data.find((event) => event.eventId === eventId);

                    if (event) {
                        setIsPublished(event.visibile); // Assuming visibility status is stored in the "visibile" property
                    } else {
                        console.error('Event not found:', eventId);
                    }
                } else {
                    console.error('Error fetching initial visibility:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching initial visibility:', error);
            }
        };

        fetchInitialVisibility();
    }, [eventId]); // Include eventId in the dependency array to update visibility when eventId changes

    const handleDownloadCsvClick = () => {
        // Trigger download by navigating to the CSV file download endpoint
        window.location.href = `http://localhost:9003/admin/download/${eventId}/participants/csv`;
    };

    const handleDuplicateEventClick = async () => {
        try {
            setLoading(true);

            // Fetch the event details
            const token = localStorage.getItem('access_token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`http://localhost:9003/admin/event/${eventId}`, {
                headers: headers,
            });

            if (response.data.status === true) {
                const eventToDuplicate = response.data.data;

                // Make any necessary modifications to the duplicated event, e.g., changing the eventId
                delete eventToDuplicate.eventId;

                // Post the duplicated event
                const duplicateResponse = await axios.post('http://localhost:9003/admin/event/createEvent', eventToDuplicate, {
                    headers: headers,
                });

                if (duplicateResponse.data.status === true) {
                    // Refresh the list of events or take any other necessary actions
                    fetchEvents();
                } else {
                    console.error('Error duplicating event:', duplicateResponse.data.error);
                }
            } else {
                console.error('Error fetching event details:', response.data.error);
            }
        } catch (error) {
            console.error('Error duplicating event:', error);
        } finally {
            setLoading(false);
        };
    };


    // console.log('Event ID', eventId);

    return (
        <div className='bg-white hidden absolute top-[0px] left-0 w-[100%] event-hover max-w-[300px] h-[349px] mb-6 p-3 shadow-secondary gap-2 group-hover:flex flex-col rounded-[6px]'>
            <Button variant='hoverButton' onClick={() => ViewEvent(eventId)}>
                <img src="/Hover/Eye.svg" alt="View" />
                View
            </Button>
            <Button variant='hoverButton' onClick={() => EditEvent(eventId)}>
                <img src="/Hover/PencilSimpleLine.svg" alt="Edit" />
                Edit
            </Button>
            <Button variant='hoverButton' onClick={Delete}>
                <img src="/Hover/Trash.svg" alt="Delete" />
                Delete
            </Button>
            <Button variant='hoverButton' onClick={handleDuplicateEventClick}>
                <img src="/Hover/Copy.svg" alt="Duplicate" />
                Duplicate Event
            </Button>
            <Button variant='hoverButton' onClick={handleDownloadCsvClick}>
                <img src="/Hover/DownloadSimple.svg" alt="Download CSV" />
                Download CSV
            </Button>
            <div className='flex justify-between items-center py-[5px] pr-[10px] pl-[20px] '>
                <div className='flex items-center gap-2'>
                    <img src='/Hover/MegaphoneSimple.svg' alt='Duplicate' />
                    <b>Publish Event</b>
                </div>
                <button type='button' onClick={handlePublishClick}>
                    <img src={isPublished ? '/Hover/State=on.svg' : '/Hover/State=off.svg'} alt='Publish Status' />
                </button>
            </div>
        </div>
    );
}

export default EventHover;
