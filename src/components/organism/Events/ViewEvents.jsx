import CreateEventBox from '@/components/molecules/CreateEventBox';
import EventFormModal from './EventFormModal';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Auth from '../../auth/Auth';
import EventHover from './eventHover';
import ViewSigngleEventModel from './ViewSigngleEventModel';
import EditEventModel from './EditEventModel';

const ViewEvents = () => {
    const [data, setData] = useState([]);
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)
    const [isSingleEventView, setIsSingleEventView] = useState(false)
    const [isEditEventView, setIsEditEventView] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null)

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get('http://localhost:9003/admin/event/fetchAllEvents', {
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
    }

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
                fetchEvents();
            } else {
                console.error('Error deleting event:', response.data.error);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    }

    const handleEventClick = (eventId) => {
        setSelectedEventId(eventId);
        setIsSingleEventView(true);
    }

    const handleEditEvent = (eventId) => {
        setSelectedEventId(eventId);
        setIsEditEventView(true); // Add this state for editing
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    let box = "w-[23%] flex p-6 justify-center h-[349px] rounded-[8px] shadow-secondary group hover:bg-gray-100 relative"

    return (
        <div>
            <div className="flex flex-wrap gap-[32px] mt-[32px]">
                <CreateEventBox onClick={() => setIsCreateEventModalOpen(true)} />
                {data.map((event) => (
                    <div id="eventbg" className={box} key={event.eventId}>
                        <Link href={`/dashboard/events/eventdetails/${event.eventId}`}>
                            <>
                                {event.eventId}
                            </>
                        </Link>
                        <EventHover
                            Delete={() => handleDelete(event.eventId)}
                            ViewEvent={() => handleEventClick(event.eventId)}
                            EditEvent={() => handleEditEvent(event.eventId)} // Add this line
                            eventId={event.eventId}
                        />
                        {isCreateEventModalOpen && <EventFormModal onClose={() => setIsCreateEventModalOpen(false)} />}
                        {isSingleEventView && <ViewSigngleEventModel onClose={() => setIsSingleEventView(false)} eventId={selectedEventId} />}
                        {isEditEventView && <EditEventModel onClose={() => setIsEditEventView(false)} eventId={selectedEventId} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Auth(ViewEvents)
