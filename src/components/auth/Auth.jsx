"use client"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        router.push('/admin-login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default Auth;
