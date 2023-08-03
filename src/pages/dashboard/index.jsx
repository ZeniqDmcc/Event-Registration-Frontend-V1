"use client"
import Link from "next/link";
import Auth from "../../components/auth/Auth"

const Dashboard = () => {
  return <div>Dashboard<br />
    <Link href="/dashboard/events"><>Events</></Link>
  </div>;
};

export default Auth(Dashboard);