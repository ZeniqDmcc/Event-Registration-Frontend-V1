import Button from "../atoms/Button"
import Heading from "../atoms/Heading"
import FieldButton from "../molecules/FieldButton"
import LogoutButton from "../organism/Logout"
import React, { useState } from 'react'
import NotificationModel from "../organism/NotificationModel"
import CreateEventFormModal from "../organism/Forms/CreateEventFormModal"

function Header() {

  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCcreaetFormEvent, setIsCreaetFormEvent] = useState(false);

  return (
    <div className="shadow-primary">
      <div className="container flex mx-auto justify-between py-[15px]">
        <Heading level="1">Admin Dashboard</Heading>
        <div className="flex gap-6">
          <FieldButton onClick={() => setIsNotificationModalOpen(true)} customStyle='w-[161px] justify-center' icon="/FormButtonsIcons/Bell.svg" alt="Field icon">Notifications</FieldButton>
          <Button onClick={() => setIsCreaetFormEvent(true)} customButtonStyle='max-w-140px' variant='primary'>Create Event</Button>
          <LogoutButton />
        </div>
      </div>
      {isNotificationModalOpen && <NotificationModel onClose={() => setIsNotificationModalOpen(false)} />}
      {isCcreaetFormEvent && <CreateEventFormModal onClose={() => setIsCreaetFormEvent(false)} />}
    </div>
  )
}

export default Header