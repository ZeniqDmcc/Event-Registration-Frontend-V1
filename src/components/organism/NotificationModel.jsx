import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/solid';
import Heading from '../atoms/Heading';

const NotificationModel = ({ onClose }) => {
    const [readNotifications, setReadNotifications] = useState([]);

    // Load read notifications from localStorage on component mount
    useEffect(() => {
        const savedReadNotifications = localStorage.getItem('readNotifications');
        if (savedReadNotifications) {
            setReadNotifications(JSON.parse(savedReadNotifications));
        }
    }, []);

    // Save read notifications to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
    }, [readNotifications]);

    const handleReadClick = (index) => {
        if (!readNotifications.includes(index)) {
            setReadNotifications([...readNotifications, index]);
        }
    };

    let notificationInnerStyle = "bg-bgHover py-[16px] px-[32px] rounded-[6px] flex flex-col gap-[4px]"
    let notificationTitle = "text-textColor text-[18px] font-[500]"
    let notificationTime = "text-textColor text-[14px] font-[500]"

    return (
        <div className='fixed inset-0 flex flex-col z-10 justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white rounded-lg p-6 z-10 relative w-[80%] overflow-scroll h-[90vh]'>
                <div className="flex justify-end">
                    <button className='text-gray-500 hover:text-gray-700' onClick={onClose}>
                        <XIcon className='w-5 h-5' />
                    </button>
                </div>
                <div className='flex flex-col'>
                    <div className="flex gap-4">
                        <Heading level="3">Notifications</Heading>
                        <button className=''>
                            Read all
                        </button>
                    </div>
                    <div className="mt-[24px] flex flex-col gap-4">
                        {Array.from({ length: 17 }, (_, index) => (
                            <div
                                key={index}
                                className={`${notificationInnerStyle} ${readNotifications.includes(index) ? 'bg-transparent' : 'bg-bgHover'} cursor-pointer`}
                                onClick={() => handleReadClick(index)}
                            >
                                <p className={notificationTitle}>A participant registered for the event ZENCON 2023.</p>
                                <p className={notificationTime}>03/08/2023 at 10:24 am</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationModel;
