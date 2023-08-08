"use client"
import Link from "next/link";
import Auth from "../../components/auth/Auth"
import Button from "@/components/atoms/Button";
import FieldButton from "@/components/organism/FieldButton";
import "@/../../globals.css"
import InputAdditionalFeatures from "@/components/organism/InputAdditionalFeatures";

const Dashboard = () => {
  return <div>Dashboard<br />
    <Button href="/dashboard/events" variant="primary">Events</Button>
    <FieldButton icon="/FormButtonsIcons/Bell.svg" alt="Field icon">Text</FieldButton>
    <InputAdditionalFeatures />
  </div>;
};

export default Auth(Dashboard);