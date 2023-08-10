import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/admin-login');
  };

  return (
    <button className='text-[#FF6060] text-[16px] font-[700]' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
