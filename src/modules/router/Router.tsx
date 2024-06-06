import { Navigate, createBrowserRouter } from 'react-router-dom';
import { DashboardLayout } from '../layouts';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      ...routes.map((route) => ({
        path: route.path,
        element: route.element,
      })),
      {
        path: '',
        element: <Navigate to={routes[0].path} />,
      },
    ],
  },
]);
