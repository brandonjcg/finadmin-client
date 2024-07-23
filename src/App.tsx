import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import {
  AuthPage,
  DashboardLayout,
  GoogleOAuthSuccessRedirect,
  hasAuthUser,
  router,
} from './modules';

export const App = () => {
  const navigate = useNavigate();
  const auth = hasAuthUser();

  useEffect(() => {
    if (!auth) navigate('/auth');
  }, [auth, navigate]);

  return (
    <>
      <Analytics />
      <Routes>
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="auth/google-oauth-success-redirect"
          element={<GoogleOAuthSuccessRedirect />}
        />
        {auth && (
          <Route path="/" element={<DashboardLayout />}>
            {router.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        )}
      </Routes>
    </>
  );
};
