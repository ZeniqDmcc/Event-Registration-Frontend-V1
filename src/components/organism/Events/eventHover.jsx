import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '../../atoms/Button';

function EventHover({ Delete, ViewEvent, EditEvent, eventId, onClose, Publish }) {
    const [isPublished, setIsPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const [eventIdField, setEventIdField] = useState('');
    const [showDuplicateModal, setShowDuplicateModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
                    const event = response.data.data.find((event) => event.eventId === eventId);

                    if (event) {
                        setIsPublished(event.visibile);
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
    }, [eventId]);

    const handleDownloadCsvClick = () => {
        window.location.href = `http://localhost:9003/admin/download/${eventId}/participants/csv`;
    };

    const handleDuplicateEventClick = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('access_token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(`http://localhost:9003/admin/event/${eventId}`, {
                headers: headers,
            });

            if (response.data.status === true) {
                const eventToDuplicate = response.data.data;

                eventToDuplicate.eventId = eventIdField;
                eventToDuplicate.notificationEmail = "zeniqdmcc@gmail.com";

                const duplicateResponse = await axios.post('http://localhost:9003/admin/event/createEvent', eventToDuplicate, {
                    headers: headers,
                });

                // if (duplicateResponse.data.status === true) {
                //     fetchEvents();
                // } else {
                //     console.error('Error duplicating event:', duplicateResponse.data.error);
                // }
            } else {
                console.error('Error fetching event details:', response.data.error);
            }
        } catch (error) {
            console.error('Error duplicating event:', error);
        } finally {
            setLoading(false);
            setShowDuplicateModal(false);
        };
    };

    const handleDuplicateButtonClick = () => {
        handleDuplicateEventClick();
    };

    const handleDeleteButtonClick = () => {
        // Show the delete confirmation popup
        setShowDeleteConfirmation(true);
    };

    const handleDeleteConfirm = () => {
        // Close the confirmation popup
        setShowDeleteConfirmation(false);
        // Call the delete function
        Delete();
    };

    const handleDeleteCancel = () => {
        // Close the confirmation popup
        setShowDeleteConfirmation(false);
    };

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
            <Button variant='hoverButton' onClick={handleDeleteButtonClick}>
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

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className='fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex items-center justify-center'>
                    <div className='modal mx-auto p-6 bg-white rounded-lg shadow-lg'>
                        <h2 className='text-xl font-bold mb-4 text-center'>Are you sure want to delete event?</h2>
                        <div className='flex justify-center'>
                            <button
                                className='w-24 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none'
                                onClick={handleDeleteConfirm}
                            >
                                Yes
                            </button>
                            <button
                                className='w-24 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none'
                                onClick={handleDeleteCancel}
                            >
                                No
                            </button>
                        </div>
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
