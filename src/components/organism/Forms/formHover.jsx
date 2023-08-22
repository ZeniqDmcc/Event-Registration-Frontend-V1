import React from 'react'
// import Button from '../../atoms/Button'
import Button from '@/components/atoms/Button'

function FormHover({ viewFormData, editFormData, deleteFormData, duplicateFormData }) {
  return (
    <div className='bg-white hidden event-hover max-w-[300px] h-[349px] mb-6 p-3 shadow-secondary gap-2 group-hover:flex flex-col rounded-[6px]'>
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
    </div>
  )
}

export default FormHover