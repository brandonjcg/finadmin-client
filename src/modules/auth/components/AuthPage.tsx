import { hasAuthUser } from '@/modules';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const auth = hasAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) navigate('/');
  }, [auth, navigate]);

  const onGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_SERVER_URL}auth/google`;
  };

  return (
    <div>
      <button onClick={onGoogleLogin}>Google Login</button>
    </div>
  );
};
