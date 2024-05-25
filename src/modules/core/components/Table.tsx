import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { useFetchById, useFetchData } from '../hooks';

interface ITableProps {
  columns: GridColDef[];
  url: string;
}

interface IPaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export const Table = <T,>({ url, columns }: ITableProps) => {
  const [pagination, setPagination] = useState<IPaginationState>({
    page: 0,
    pageSize: 10,
    total: 0,
  });

  const { rows, total } = useFetchData<T>(
    url,
    pagination.page,
    pagination.pageSize,
  );

  const fetchById = useFetchById<T>(url);

  const handleRowClick = async (params: GridRowParams) => {
    const row = await fetchById(params.row._id);
    console.log('🚀 ~ handleRowClick ~ row:', row);
  };

  return (
    <DataGrid
      getRowId={({ _id }) => _id}
      rows={rows}
      columns={columns}
      paginationMode="server"
      rowCount={total}
      pageSizeOptions={[10]}
      paginationModel={{
        page: pagination.page,
        pageSize: pagination.pageSize,
      }}
      onPaginationModelChange={(model: GridPaginationModel) => {
        if (model.page !== pagination.page)
          setPagination((prev) => ({ ...prev, page: model.page }));
        if (model.pageSize !== pagination.pageSize)
          setPagination({
            page: 0,
            pageSize: model.pageSize,
            total: pagination.total,
          });
      }}
      checkboxSelection
      autoHeight
      onRowClick={handleRowClick}
    />
  );
};
