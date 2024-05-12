import { Route, Routes } from 'react-router-dom';
import { Banks, Sidebar, Dashboard, ErrorPage } from './modules';

const routes = [
  {
    title: 'Dashboard',
    path: '/',
    element: <Dashboard />,
  },
  {
    title: 'Banks',
    path: '/banks',
    element: <Banks />,
  },
];

export const App = () => {
  return (
    <>
      <Sidebar routes={routes} />
      <Routes>
        {routes.map((route) => (
          <Route key={route.title} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
