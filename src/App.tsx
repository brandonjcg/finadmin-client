import { RouterProvider } from 'react-router-dom';
import { router } from './modules';
import { Analytics } from '@vercel/analytics/react';

export const App = () => {
  return (
    <>
      <Analytics />
      <RouterProvider router={router} />;
    </>
  );
};
