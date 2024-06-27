import { RouterProvider } from 'react-router-dom';
import { router } from './modules';

export const App = () => {
  return <RouterProvider router={router} />;
};
