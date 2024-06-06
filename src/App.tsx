import { RouterProvider } from 'react-router-dom';
import { router, type TODO } from './modules';

export const App = (): TODO => {
  return <RouterProvider router={router} />;
};
