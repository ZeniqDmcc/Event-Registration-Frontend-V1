"use client"
import "@/../../globals.css";
import Button from "@/components/atoms/Button";
import FieldButton from "@/components/organism/FieldButton";
import InputAdditionalFeatures from "@/components/organism/InputAdditionalFeatures";
import Auth from "../../components/auth/Auth";
import FormHover from "@/components/organism/formHover";
import EventHover from "@/components/organism/eventHover";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";

const Dashboard = () => {
  return <div>
    <Header />
    <br />
    <br />
    <br />
    <Button href="/dashboard/events" variant="primary">Events</Button>
    <FieldButton icon="/FormButtonsIcons/Bell.svg" alt="Field icon">Text</FieldButton>
    <InputAdditionalFeatures />
    <EventHover />
    {/* <FormHover /> */}
    <Footer />
  </div>;
};

export default Auth(Dashboard);