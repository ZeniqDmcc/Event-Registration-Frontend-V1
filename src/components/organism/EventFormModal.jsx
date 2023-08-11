import React from 'react';
import { XIcon } from '@heroicons/react/solid'; // You can import the X icon from Heroicons or any other icon library you prefer
import Heading from '../atoms/Heading';
import Footer from '../template/Footer';
import Createevent from '@/pages/dashboard/createevent';
import CreateEventForm from './CreateEventForm';

const EventFormModal = ({ onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-[80%]'>
        <div className='flex justify-between'>
          <Heading level='2'>Create/Edit Event</Heading>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            <XIcon className='w-5 h-5' />
          </button>
        </div>
        {/* Modal Boxes Outer */}
        <div className='flex justify-between mt-4'>
          {/* Form Display Area */}
          <div className='w-[59%] bg-[#A8A8A8] p-5 rounded-[8px]'>
            {/* Header */}
            <div className='flex justify-between'>
              <div className=''>Logo</div>
              <div className=''>Banner</div>
            </div>
            {/* Form Content Area */}
            <div>Show Form Content Here...</div>
            <Footer />
          </div>

          {/* Form Fields Area */}
          <div className='w-[39%] border p-5 rounded-[8px] border-[#A8A8A8]'>
            <Heading level='5'>Event Metadata</Heading>
            <div className='mt-3'>
              {/* <Createevent /> */}
              <CreateEventForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal