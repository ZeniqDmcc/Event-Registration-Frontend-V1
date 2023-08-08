import React from 'react'

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className='text-[12px] text-textColor'>{ children }</label>
  )
}

export default Label