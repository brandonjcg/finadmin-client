import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from '@material-tailwind/react';
import {
  Banks,
  Sidebar,
  Dashboard,
  ErrorPage,
  LoadingContext,
  Transactions,
  TransactionForm,
  ToastProvider,
} from './modules';

const routes = [
  {
    title: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    visible: true,
  },
  {
    title: 'Transactions',
    path: '/transactions',
    element: <Transactions />,
    visible: true,
  },
  {
    title: 'Banks',
    path: '/banks',
    element: <Banks />,
    visible: true,
  },
  {
    title: 'Create Transaction',
    path: '/transactions/create',
    element: <TransactionForm />,
    visible: false,
  },
];

export const App = () => {
  const { isLoading } = useContext(LoadingContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="relative h-screen">
        {isLoading && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-5 z-50">
            <Spinner className="h-12 w-12 text-white" />
          </div>
        )}
        <Sidebar
          routes={routes}
          isOpen={isDrawerOpen}
          onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
        />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.title}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </ToastProvider>
  );
};
