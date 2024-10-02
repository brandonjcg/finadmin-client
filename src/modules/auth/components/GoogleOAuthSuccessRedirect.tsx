import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthState } from '../state';

export const GoogleOAuthSuccessRedirect = () => {
  const [params] = useSearchParams();
  const { setToken } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtUser = params.get('jwtUser');
    if (jwtUser) setToken(jwtUser);

    navigate('/');
  }, [navigate, params, setToken]);

  return <div>Logging in...</div>;
};
