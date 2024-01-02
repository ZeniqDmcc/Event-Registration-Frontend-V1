import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../../atoms/Button';

function EventHover({ Delete, ViewEvent, EditEvent, eventId, onClose, Publish }) {
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false)
    const [eventIdField, setEventIdField] = useState('');
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);

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

    //Download csv
    const handleDownloadCsvClick = () => {
        window.location.href = `http://localhost:9003/admin/download/${eventId}/participants/csv`;
    };

    //Duplicate event
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

                // Assign the newEventId to eventToDuplicate
                eventToDuplicate.eventId = eventIdField;

                // Optionally remove or modify any other fields as needed
                eventToDuplicate.notificationEmail = "zeniqdmcc@gmail.com";

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
            // Close the modal after duplication
            setShowDuplicateModal(false);
        };
    };


    const handleDuplicateButtonClick = () => {
        handleDuplicateEventClick();
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
            <Button variant='hoverButton' onClick={() => setShowDuplicateModal(true)}>
                <img src="/Hover/Copy.svg" alt="Duplicate" />
                Duplicate Event
            </Button>

            {/* Duplicate Event Modal */}
            {showDuplicateModal && (
                <div className='fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex items-center justify-center mt-[-100px]'>
                    <div className='modal mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg w-[300px]'>
                        <div className='flex justify-end'>
                            <span className='close cursor-pointer text-2xl' onClick={() => setShowDuplicateModal(false)}>
                                &times;
                            </span>
                        </div>
                        <h2 className='text-xl font-bold mb-4 text-center'>Enter Event ID</h2>
                        <input
                            className='w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500'
                            type='text'
                            value={eventIdField}
                            onChange={(e) => setEventIdField(e.target.value)}
                            placeholder='Enter Event ID'
                        />
                        <button
                            className='w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none'
                            onClick={handleDuplicateButtonClick}
                        >
                            Duplicate Event
                        </button>
                    </div>
                </div>
            )}


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
