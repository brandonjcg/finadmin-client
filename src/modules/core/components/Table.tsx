import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { useFetchData } from '../hooks';
import { IPaginationState } from '../types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface TableProps {
  columns: GridColDef[];
  url: string;
}

export const Table = <T,>({ url, columns }: TableProps) => {
  const [pagination, setPagination] = useState<IPaginationState>({
    page: 0,
    pageSize: 10,
    total: 0,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'createdAt', sort: 'desc' },
  ]);

  const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
  };

  const { data, info } = useFetchData<T>({
    url,
    page: pagination.page,
    pageSize: pagination.pageSize,
    sortField: sortModel[0]?.field,
    sortOrder: sortModel[0]?.sort,
    pagination: true,
  });

  const navigate = useNavigate();

  const handleRowClick = async (params: GridRowParams) => {
    navigate(`/${url}/${params.row._id}`);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        getRowId={({ _id }) => _id}
        rows={data}
        columns={columns}
        paginationMode="server"
        rowCount={info.total}
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
        autoHeight
        onRowClick={handleRowClick}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </ThemeProvider>
  );
};
