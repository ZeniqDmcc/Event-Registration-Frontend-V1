import React, { useState } from 'react';
import "@/../../globals.css";
import Footer from "@/components/template/Footer";
import Header from "@/components/template/Header";
import Auth from "../../components/auth/Auth";
import Heading from '@/components/atoms/Heading';
import EventHover from '@/components/organism/Events/eventHover';
import FormHover from '@/components/organism/Forms/formHover';
import EventFormModal from '@/components/organism/Events/EventFormModal';
import FormsFormModal from '@/components/organism/Forms/FormsFormModal'
import CreateEventBox from '@/components/molecules/CreateEventBox';
import CreateFormBox from '@/components/molecules/CreateFormBox';
import ViewEvents from '@/components/organism/Events/ViewEvents';
import ViewFormsData from '@/components/organism/Forms/ViewForms';

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
                <ViewEvents />
            </div>
          </div>
        )}

        {/* Forms */}
        {activeTab === 'form' && (
          <div className="mt-5">
            {/* Search */}
            <div className='max-w-[641px] mx-auto mt-[34px]'>
              <input className='text-[#A8A8A8] font-[500] text-[22px] h-[60px] outline-none w-full px-7 rounded-[40px] shadow-secondary' type='text' name='search' placeholder='Search forms' />
            </div>
            {/* Form Data */}
            <div className='mt-[49px]'>
              <Heading level='3'>All Form</Heading>
              <ViewFormsData />
            </div>
          </div>
        )}
      </div>

      {isFormModalOpen && <EventFormModal onClose={() => setIsFormModalOpen(false)} />}
      {isCreateFormModalOpen && <FormsFormModal onClose={() => setIsCreateFormModalOpen(false)} />}

      <Footer />
    </div>
  );
};

export default Auth(Dashboard);
