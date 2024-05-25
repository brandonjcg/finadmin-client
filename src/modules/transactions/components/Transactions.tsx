import { GridColDef } from '@mui/x-data-grid';
import { Table } from '@/modules';

const columns: GridColDef[] = [
  {
    field: 'bankName',
    headerName: 'Bank',
    width: 130,
    valueGetter: (_, row) => row.bank?.name ?? '',
  },
  { field: 'store', headerName: 'Store', width: 130 },
  { field: 'concept', headerName: 'Concept', width: 130 },
  {
    field: 'date',
    headerName: 'Date',
    width: 90,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.amount || ''} ${row.amount || ''}`,
  },
  {
    field: 'isReserved',
    headerName: 'Is reserved?',
    type: 'boolean',
    width: 130,
  },
  {
    field: 'isPaid',
    headerName: 'Is paid?',
    width: 130,
    type: 'boolean',
  },
  {
    field: 'additionalComments',
    headerName: 'Additional comments',
    width: 200,
  },
];

export const Transactions = () => {
  return <Table url="transaction" columns={columns} title="Transactions" />;
};
