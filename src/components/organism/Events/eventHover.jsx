import Button from '../../atoms/Button'
import { use, useState } from 'react'

function EventHover({ Delete, ViewEvent, EditEvent, eventId, onClose, Publish }) {

    const [isPublished, setIsPublished] = useState(false)

    const handlePublishClick = () => {
        Publish(eventId);
        setIsPublished((prevIsPublished) => !prevIsPublished);
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
            <Button variant='hoverButton' onClick={Delete}>
                <img src="/Hover/Trash.svg" alt="Delete" />
                Delete
            </Button>
            <Button variant='hoverButton' href='/dashboard'>
                <img src="/Hover/Copy.svg" alt="Duplicate" />
                Duplicate
            </Button>
            <Button variant='hoverButton' href='/dashboard'>
                <img src="/Hover/DownloadSimple.svg" alt="Duplicate" />
                Duplicate
            </Button>
            <div className='flex justify-between items-center py-[5px] pr-[10px] pl-[20px] '>
                <div className='flex items-center gap-2'>
                    <img src="/Hover/MegaphoneSimple.svg" alt="Duplicate" />
                    <b>Publish Event</b>
                </div>
                <button type='button' onClick={handlePublishClick}>
                    <img src={isPublished ? '/Hover/State=on.svg' : '/Hover/State=off.svg'} alt="Publish Status" />
                </button>
            </div>
        </div>
    )
}

export default EventHover