import { Banks } from '../banks';
import { Dashboard } from '../dashboard';
import { TransactionForm, Transactions } from '../transactions';

export const routes = [
  {
    title: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    description: 'Test',
    icon: 'fa-solid fa-spell-check',
    hidden: false,
  },
  {
    title: 'Transactions',
    path: '/transactions',
    element: <Transactions />,
    description: 'Test',
    icon: 'fa-solid fa-spell-check',
    hidden: false,
  },
  {
    title: 'Banks',
    path: '/banks',
    element: <Banks />,
    description: 'Test',
    icon: 'fa-solid fa-spell-check',
    hidden: false,
  },
  {
    title: 'Create transaction',
    path: '/transactions/create',
    description: 'Test',
    element: <TransactionForm />,
    icon: 'fa-solid fa-credit-card-alt',
    hidden: true,
  },
];
