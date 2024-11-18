import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridRowSelectionModel,
  GridSortModel,
} from '@mui/x-data-grid';
import { useFetchData } from '../hooks';
import { IPaginationState } from '../types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '@mui/material';

interface TableProps {
  name: string;
  columns: GridColDef[];
  url: string;
  rowSelection: GridRowSelectionModel;
  setRowSelection: (rowSelection: GridRowSelectionModel) => void;
}

export const Table = <T,>({
  name,
  url: originalUrl,
  columns,
  rowSelection,
  setRowSelection,
}: TableProps) => {
  const [pagination, setPagination] = useState<IPaginationState>({
    page: 0,
    pageSize: 10,
    total: 0,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'createdAt', sort: 'desc' },
  ]);
  const [url, setUrl] = useState<string>(originalUrl);

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
    navigate(`/${name}/${params.row._id}`, { replace: true });
  };

  const onFilterChange = debounce((model: GridFilterModel) => {
    let newFilters = '';

    model.items.forEach((item) => {
      if (item.value === '' || !item.value) return;

      newFilters += `filters[${item.field}]=${item.value}&`;
    });

    newFilters = newFilters.slice(0, -1);

    if (newFilters !== '') {
      setUrl((prevUrl) => {
        const [base, ...params] = prevUrl.split('?');
        const existingParams = params.length ? params[0].split('&') : [];
        const newParams = existingParams.map((param) => {
          const [key] = param.split('=');
          const newFilterKey = newFilters.split('=')[0];
          if (key === newFilterKey) {
            return newFilters;
          }
          return param;
        });

        if (!newParams.includes(newFilters)) {
          newParams.push(newFilters);
        }

        return `${base}?${newParams.join('&')}`;
      });
    }
  }, 500);

  return (
    <DataGrid
      getRowId={({ _id }) => _id}
      rows={data}
      columns={columns}
      paginationMode="server"
      rowCount={info.total}
      pageSizeOptions={[10, 25, 50, 100]}
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
      filterMode="server"
      checkboxSelection
      onFilterModelChange={onFilterChange}
      onRowSelectionModelChange={(newRowSelectionModel) =>
        setRowSelection(newRowSelectionModel)
      }
      rowSelectionModel={rowSelection}
      keepNonExistentRowsSelected
    />
  );
};
