import { TODO } from '@/modules';
import { Table } from '@/modules/core/components/Table';
import { Link } from 'react-router-dom';

const columns = [
  {
    field: 'bank',
    headerName: 'Bank',
    width: 150,
    valueGetter: (params: TODO) => params?.name,
  },
  { field: 'concept', headerName: 'Concept', width: 150 },
  { field: 'store', headerName: 'Store', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'isReserved', headerName: 'Reserved', width: 150 },
  { field: 'isPaid', headerName: 'Paid', width: 150 },
  {
    field: 'additionalComments',
    headerName: 'Additional Comments',
    width: 200,
  },
];

export const Transactions = () => {
  return (
    <div className="overflow-x-auto">
      <Link
        to="/transaction/create"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add transaction
      </Link>
      <Table columns={columns} url="transaction" />
    </div>
  );
};
