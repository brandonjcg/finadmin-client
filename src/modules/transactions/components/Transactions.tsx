import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { ITransaction } from '../types';
import { IResponseAxios, LoadingContext } from '@/modules';

const url = `${import.meta.env.VITE_API_SERVER_URL}transaction`;

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

// TODO: pagination pending

export const Transactions = () => {
  const [rows, setRows] = useState<ITransaction[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 10,
    total: 0,
  });
  const { setIsLoading } = useContext(LoadingContext);

  const fetchData = async (page: number, pageSize: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get<IResponseAxios<ITransaction>>(url, {
        params: { page: page + 1, limit: pageSize }, // Adjusted for 1-based indexing
      });
      const data = response.data.data;
      setRows(data.rows || []);
      setPagination({
        page: data.page - 1,
        pageSize: data.limit,
        total: data.total,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize);
  }, []);

  const handlePageChange = (newPage: number) => {
    fetchData(newPage, pagination.pageSize);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    fetchData(0, newPageSize);
    setPagination({ page: 0, pageSize: newPageSize, total: pagination.total });
  };

  return (
    <DataGrid
      getRowId={({ _id }) => _id}
      rows={rows}
      columns={columns}
      paginationMode="server"
      rowCount={pagination.total}
      pageSizeOptions={[10]}
      paginationModel={{
        page: pagination.page,
        pageSize: pagination.pageSize,
      }}
      onPaginationModelChange={(model: GridPaginationModel) => {
        if (model.page !== pagination.page) {
          handlePageChange(model.page);
        }
        if (model.pageSize !== pagination.pageSize) {
          handlePageSizeChange(model.pageSize);
        }
      }}
      checkboxSelection
      autoHeight
    />
  );
};
