import { useEffect } from 'react';

const Auth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {

    useEffect(() => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        window.location.href = '/login'; 
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default Auth
