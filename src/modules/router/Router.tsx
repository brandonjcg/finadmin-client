import { Navigate } from 'react-router-dom';
import { routes } from './routes';

export const router = [
  ...routes.map((route) => ({
    path: route.path,
    element: route.element,
  })),
  {
    path: '*',
    element: <Navigate to={routes[0].path} replace />,
  },
];
