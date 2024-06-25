import { Banks } from '../banks';
import { Dashboard } from '../dashboard';
import { Totals } from '../totals';
import { TransactionForm, Transactions } from '../transactions';

export const routes = [
  {
    title: 'Dashboard',
    path: '/',
    element: <Dashboard />,
    description: 'Test',
    icon: 'fa-solid fa-tachometer',
    hidden: false,
  },
  {
    title: 'Transactions',
    path: '/transaction',
    element: <Transactions />,
    description: 'Test',
    icon: 'fa-solid fa-receipt',
    hidden: false,
  },
  {
    title: 'Banks',
    path: '/banks',
    element: <Banks />,
    description: 'Test',
    icon: 'fa-solid fa-university',
    hidden: false,
  },
  {
    title: 'Create transaction',
    path: '/transaction/create',
    description: 'Test',
    element: <TransactionForm />,
    icon: 'fa-solid fa-credit-card-alt',
    hidden: true,
  },
  {
    title: 'Edit transaction',
    path: '/transaction/:id',
    description: 'Test',
    element: <TransactionForm />,
    icon: 'fa-solid fa-credit-card-alt',
    hidden: true,
  },
  {
    title: 'Totals',
    path: '/totals',
    element: <Totals />,
    description: 'Grouped totals',
    icon: 'fa-solid fa-calculator',
    hidden: false,
  },
];
