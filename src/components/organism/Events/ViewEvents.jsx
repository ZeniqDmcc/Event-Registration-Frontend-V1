import CreateEventBox from '@/components/molecules/CreateEventBox';
import EventFormModal from './EventFormModal';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Auth from '../../auth/Auth';
import EventHover from './eventHover';
import ViewSigngleEventModel from './ViewSigngleEventModel';
import EditEventModel from './EditEventModel';
import CreateNewEvent from './CreateNewEvent';
import CreateFormModal from '../Forms/FormsFormModal';
import Heading from '@/components/atoms/Heading';

const ViewEvents = () => {
    const [data, setData] = useState([]);
    const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false)
    const [isSingleEventView, setIsSingleEventView] = useState(false)
    const [isEditEventView, setIsEditEventView] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null)
    const [visibility, setVisibility] = useState(false)

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
        setIsEditEventView(true);
    }

    const handlePublish = async (eventId) => {
        try {
            const token = localStorage.getItem('access_token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // Update the visibility state based on the current state
            const newVisibilityState = !visibility;

            // Log the constructed URL for debugging
            const url = `http://localhost:9003/admin/event/${eventId}/visibility/${newVisibilityState}`;
            console.log('Publish URL:', url);

            const response = await axios.patch(url, null, { headers });

            if (response.data.status === true) {
                console.log('Event published successfully:', response.data.data);

                // Update the visibility state based on the new state
                setVisibility(newVisibilityState);

                fetchEvents(); // Update the event list
            } else {
                console.error('Error publishing event:', response.data.error);
            }
        } catch (error) {
            console.error('Error publishing event:', error);
        }
    };

    useEffect(() => {
        fetchEvents()
    }, [])

    let box = "w-[23%] flex p-6 justify-center h-[349px] rounded-[8px] shadow-secondary group hover:bg-gray-100 relative"

    // console.log("Current status of vis:::", visibility)

    return (
        <div>
            <div className="flex flex-wrap gap-[32px] mt-[32px]">
                <CreateEventBox onClick={() => setIsCreateEventModalOpen(true)} />
                {data.map((event) => (
                    <div id="eventbg" className={box} key={event.eventId}>
                        <Link href={`/dashboard/events/eventdetails/${event.eventId}`}>
                            <Heading className='bg-white px-16' level='3'>
                                {event.eventId}
                            </Heading>
                        </Link>
                        <EventHover
                            Delete={() => handleDelete(event.eventId)}
                            ViewEvent={() => handleEventClick(event.eventId)}
                            EditEvent={() => handleEditEvent(event.eventId)}
                            eventId={event.eventId}
                            Publish={() => handlePublish(event.eventId)}
                        />
                    </div>
                ))}
                {isCreateEventModalOpen && <EventFormModal onClose={() => setIsCreateEventModalOpen(false)} />}
                {isSingleEventView && <ViewSigngleEventModel onClose={() => setIsSingleEventView(false)} eventId={selectedEventId} />}
                {isEditEventView && <EditEventModel onClose={() => setIsEditEventView(false)} eventId={selectedEventId} />}
            </div>
        </div>
    )
}

export default Auth(ViewEvents)
