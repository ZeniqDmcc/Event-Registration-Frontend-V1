import React from 'react'
import Button from '../atoms/Button'
import Heading from '../atoms/Heading'

function EventHover() {
    return (
        <div className='bg-white max-w-[300px] h-[349px] mb-6 p-3 border gap-2 flex flex-col rounded-[6px]'>
            <Button variant='hoverButton' href='/dashboard'>
                <img src="/Hover/Eye.svg" alt="View" />
                View
            </Button>
            <Button variant='hoverButton' href='/dashboard'>
                <img src="/Hover/PencilSimpleLine.svg" alt="Edit" />
                Edit
            </Button>
            <Button variant='hoverButton' href='/dashboard'>
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
            <div className='flex justify-between items-center py-[5px] px-[20px] '>
                    <div className='flex items-center gap-2'>
                    <img src="/Hover/MegaphoneSimple.svg" alt="Duplicate" />
                    <b>Publish Event</b>
                    </div>
                <img src="/Hover/State=off.svg" alt="" />
            </div>
        </div>
    )
}

export default EventHover