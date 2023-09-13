import React, { useState } from 'react'
import '@/../globals.css'

function tester() {

    let [show, setShow] = useState(false)

    

    return (
        <div>
            <div onClick={() => setShow(!show)} className=''>
                <label htmlFor="">Select something</label>
            </div>
            {
                show && (
                    <div className='flex flex-col'>
                        <label>Hello, testing</label>
                        <label>Hello, testing</label>
                        <label>Hello, testing</label>
                        <label>Hello, testing</label>
                        <label>Hello, testing</label>
                        <label>Hello, testing</label>
                    </div>
                )
            }
        </div>
    )
}

export default tester