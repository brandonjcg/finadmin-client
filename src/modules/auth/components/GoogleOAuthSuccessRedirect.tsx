import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserDef, useAuthState } from '../state';
import { useCookies } from 'react-cookie';

export const GoogleOAuthSuccessRedirect = () => {
  const [params] = useSearchParams();
  const { setUser } = useAuthState();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['jwt']);

  useEffect(() => {
    const jwtUser = params.get('jwtUser');
    if (jwtUser) {
      setCookie('jwt', jwtUser, {
        sameSite: 'none',
        path: '/',
      });
      const userFromJwt: UserDef = jwtDecode(jwtUser);
      userFromJwt && setUser(userFromJwt);
    }

    navigate('/');
  }, [navigate, params, setCookie, setUser]);

  return <div>Logging in...</div>;
};
