import React, { useState } from 'react';
import "@/../../globals.css";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Auth from "../../components/auth/Auth";
import Heading from '@/components/atoms/Heading';
import EventHover from '@/components/organism/eventHover';
import FormHover from '@/components/organism/formHover';
import EventFormModal from '@/components/organism/EventFormModal';
import CreateFormModal from '@/components/organism/CreateFormModal'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCreateFormModalOpen, setIsCreateFormModalOpen] = useState(false);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  let box = "w-[23%] h-[349px] rounded-[8px] shadow-secondary group hover:bg-gray-100"
  let singleBox = "w-[23%] ixb-flex-both flex-col gap-6 bg-bluebg h-[349px] rounded-[8px] shadow-secondary cursor-pointer"

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Page Content */}

      <div className='max-w-[1280px] px-[30px] mx-auto py-[50px]'>

        {/* Tabs */}
        <div className="flex justify-center mt-5 gap-[10px]">
          <button
            className={`hover:bg-bgHover py-[10px] rounded-[6px] px-[14px] ${activeTab === 'events' ? 'font-bold bg-fieldButton ' : ''}`}
            onClick={() => handleTabChange('events')}
          >
            Events
          </button>
          <button
            className={`hover:bg-bgHover py-[10px] rounded-[6px] px-[14px] ${activeTab === 'form' ? 'font-bold bg-fieldButton' : ''}`}
            onClick={() => handleTabChange('form')}
          >
            Form
          </button>
        </div>

        {/* Events */}
        {activeTab === 'events' && (
          <div className="">
            {/* Search */}
            <div className='max-w-[641px] mx-auto mt-[34px]'>
              <input className='text-[#A8A8A8] font-[500] text-[22px] h-[60px] outline-none w-full px-7 rounded-[40px] shadow-secondary' type='text' name='search' placeholder='Search events' />
            </div>
            {/* Events Data */}
            <div className='mt-[49px]'>
              <Heading level='3'>All Events</Heading>
              <div className='flex flex-wrap gap-[32px] mt-[32px]'>
                {/* New event */}
                <div className={singleBox} onClick={() => setIsFormModalOpen(true)}>
                  <svg width="62" height="62" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM13 24C10.8244 24 8.69767 23.3549 6.88873 22.1462C5.07979 20.9375 3.66989 19.2195 2.83733 17.2095C2.00477 15.1995 1.78693 12.9878 2.21137 10.854C2.63581 8.72022 3.68345 6.7602 5.22183 5.22183C6.76021 3.68345 8.72022 2.6358 10.854 2.21136C12.9878 1.78692 15.1995 2.00476 17.2095 2.83733C19.2195 3.66989 20.9375 5.07979 22.1462 6.88873C23.3549 8.69767 24 10.8244 24 13C23.9967 15.9164 22.8367 18.7123 20.7745 20.7745C18.7123 22.8367 15.9164 23.9967 13 24ZM19 13C19 13.2652 18.8946 13.5196 18.7071 13.7071C18.5196 13.8946 18.2652 14 18 14H14V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V14H8.00001C7.73479 14 7.48044 13.8946 7.2929 13.7071C7.10536 13.5196 7.00001 13.2652 7.00001 13C7.00001 12.7348 7.10536 12.4804 7.2929 12.2929C7.48044 12.1054 7.73479 12 8.00001 12H12V8C12 7.73478 12.1054 7.48043 12.2929 7.29289C12.4804 7.10536 12.7348 7 13 7C13.2652 7 13.5196 7.10536 13.7071 7.29289C13.8946 7.48043 14 7.73478 14 8V12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13Z" fill="#fff" />
                  </svg>
                  <h2 className='text-[22px] font-[600] text-white text-center cursor-pointer'>
                    Create New Event
                  </h2>
                </div>
                {/* Existence event */}
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
                <div id='eventbg' className={box}>
                  <EventHover />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Forms */}
        {activeTab === 'form' && (
          <div className="mt-5">
            <div className='max-w-[641px] mx-auto mt-[34px]'>
              <input className='text-[#A8A8A8] font-[500] text-[22px] h-[60px] outline-none w-full px-7 rounded-[40px] shadow-secondary' type='text' name='search' placeholder='Search forms' />
            </div>
            {/* Events Data */}
            <div className='mt-[49px]'>
              <Heading level='3'>All Form</Heading>
              <div className='flex flex-wrap gap-[32px] mt-[32px]'>
                {/* New event */}
                <div className={singleBox} onClick={() => setIsCreateFormModalOpen(true)}>
                  <svg width="62" height="62" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM13 24C10.8244 24 8.69767 23.3549 6.88873 22.1462C5.07979 20.9375 3.66989 19.2195 2.83733 17.2095C2.00477 15.1995 1.78693 12.9878 2.21137 10.854C2.63581 8.72022 3.68345 6.7602 5.22183 5.22183C6.76021 3.68345 8.72022 2.6358 10.854 2.21136C12.9878 1.78692 15.1995 2.00476 17.2095 2.83733C19.2195 3.66989 20.9375 5.07979 22.1462 6.88873C23.3549 8.69767 24 10.8244 24 13C23.9967 15.9164 22.8367 18.7123 20.7745 20.7745C18.7123 22.8367 15.9164 23.9967 13 24ZM19 13C19 13.2652 18.8946 13.5196 18.7071 13.7071C18.5196 13.8946 18.2652 14 18 14H14V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V14H8.00001C7.73479 14 7.48044 13.8946 7.2929 13.7071C7.10536 13.5196 7.00001 13.2652 7.00001 13C7.00001 12.7348 7.10536 12.4804 7.2929 12.2929C7.48044 12.1054 7.73479 12 8.00001 12H12V8C12 7.73478 12.1054 7.48043 12.2929 7.29289C12.4804 7.10536 12.7348 7 13 7C13.2652 7 13.5196 7.10536 13.7071 7.29289C13.8946 7.48043 14 7.73478 14 8V12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13Z" fill="#fff" />
                  </svg>
                  <h2 className='text-[22px] font-[600] text-white text-center cursor-pointer'>
                    Create New Form
                  </h2>
                </div>
                {/* Existence event */}
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
                <div id='formbg' className={box}>
                  <FormHover />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isFormModalOpen && <EventFormModal onClose={() => setIsFormModalOpen(false)} />}
      {isCreateFormModalOpen && <CreateFormModal onClose={() => setIsCreateFormModalOpen(false)} />}

      <Footer />
    </div>
  );
};

export default Auth(Dashboard);
