import React from 'react'

function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className='text-[14px] font-[500] text-textColor'>{ children }</label>
  )
}

export default Label