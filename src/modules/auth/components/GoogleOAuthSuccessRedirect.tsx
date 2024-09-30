import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserDef, useAuthState } from '../state';

export const GoogleOAuthSuccessRedirect = () => {
  const [params] = useSearchParams();
  const { setUser } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtUser = params.get('jwtUser');
    if (jwtUser) {
      const userFromJwt: UserDef = jwtDecode(jwtUser);
      userFromJwt && setUser(userFromJwt);
    }

    navigate('/');
  }, [navigate, params, setUser]);

  return <div>Logging in...</div>;
};
