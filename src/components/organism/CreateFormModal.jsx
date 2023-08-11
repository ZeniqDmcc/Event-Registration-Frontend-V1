import React from 'react';
import { XIcon } from '@heroicons/react/solid'; // You can import the X icon from Heroicons or any other icon library you prefer

const CreateFormModal = ({ onClose }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-[400px]'>
        <div className='flex justify-end'>
          <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
            <XIcon className='w-5 h-5' />
          </button>
        </div>
        <div className='mt-4'>
        CreateFormModal
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal