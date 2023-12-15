import { XIcon } from '@heroicons/react/solid'; // You can import the X icon from Heroicons or any other icon library you prefer
import CreateEventBox from '../../molecules/CreateEventBox';
import CreateFormBox from '../../molecules/CreateFormBox';
import React, { useState } from 'react'
import EventFormModal from '../Events/EventFormModal';
import FormsFormModal from './FormsFormModal'


const CreateEventFormModal = ({ onClose }) => {

    const [isOpenCreateNewEvent, setIsOpenCreateNewEvent] = useState(false)
    const [isOpenCreateNewForm, setIsOpenCreateNewForm] = useState(false)

    return (
        <div className='fixed inset-0 flex flex-col z-10 justify-center items-center bg-black bg-opacity-50 backdrop-blur'>
            <div className='bg-black bg-opacity-60  h-[100vh] p-6 w-[100%]'>
                <div className='flex justify-end'>
                    <button className='text-white hover:text-bgHover' onClick={onClose}>
                        <XIcon className='w-7 h-7' />
                    </button>
                </div>
                {/* Modal Boxes Outer */}
                <div className='ixb-flex-both mt-4 h-[100%]'>
                    <div className="flex w-full mt-[-100px] gap-16 justify-center">
                        <CreateEventBox className="w-[14%]" onClick={() => setIsOpenCreateNewEvent(true)} />
                        <CreateFormBox className="w-[14%] bg-white" onClick={() => setIsOpenCreateNewForm(true)} svgColor='fill-[#1475DC]' textColor="text-[#1475DC]" customSytle="w-[15%] bg-white" />
                    </div>
                </div>
            </div>
            { isOpenCreateNewEvent && <EventFormModal onClose={() => setIsOpenCreateNewEvent(false)} /> }
            { isOpenCreateNewForm && <FormsFormModal onClose={() => setIsOpenCreateNewForm(false)} /> }
        </div>
    );
};

export default CreateEventFormModal