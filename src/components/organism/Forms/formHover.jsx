import React from 'react'
import Button from '@/components/atoms/Button'

function FormHover({ Viewform, editForm, deleteFormData, formId, duplicateFormData }) {
  return (
    <div className='bg-white hidden event-hover max-w-[300px] h-[349px] mb-6 p-3 shadow-secondary gap-2 group-hover:flex flex-col rounded-[6px]'>
        <Button variant='hoverButton'  onClick={() => Viewform(formId)}>
            <img src="/Hover/Eye.svg" alt="View" />
            View
        </Button>
        <Button variant='hoverButton'  onClick={() => editForm(formId)}>
            <img src="/Hover/PencilSimpleLine.svg" alt="Edit" />
            Edit
        </Button>
        <Button variant='hoverButton'  onClick={() => deleteFormData(formId)}>
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