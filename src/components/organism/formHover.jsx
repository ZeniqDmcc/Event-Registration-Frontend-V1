import React from 'react'
import Button from '../atoms/Button'

function FormHover() {
  return (
    <div className='bg-white max-w-[300px] h-[349px] p-3 border gap-2 flex flex-col rounded-[6px]'>
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