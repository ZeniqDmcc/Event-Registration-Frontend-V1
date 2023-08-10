import Button from "../atoms/Button"
import Heading from "../atoms/Heading"
import FieldButton from "../organism/FieldButton"
import LogoutButton from "../organism/Logout"

function Header() {
  return (
    <div className="shadow-primary">
      <div className="container flex mx-auto justify-between py-[15px]">
        <Heading level="1">Admin Dashboard</Heading>
        <div className="flex gap-6">
          <FieldButton customStyle='w-[161px]' icon="/FormButtonsIcons/Bell.svg" alt="Field icon">Text</FieldButton>
          <Button customButtonStyle='max-w-140px' variant='primary' href="/dashboard/events/createvent">Create Event</Button>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default Header