import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DialogForm, TODO, Table, useFetchData, usePostData } from '@/modules';
import toast from 'react-hot-toast';

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
  { field: 'isReserved', headerName: 'Is reserved?', width: 150 },
  { field: 'isPaid', headerName: 'Is paid?', width: 150 },
  {
    field: 'additionalComments',
    headerName: 'Additional comments',
    width: 200,
  },
];

export const Transactions = <T,>() => {
  const { data } = useFetchData<T>({
    url: 'bank/select',
  });
  const [state, setState] = useState({
    isPaid: false,
    isReserved: false,
  });
  const [bank, setBank] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(
    `transaction?filters[isPaid]=${state.isPaid}&filters[isReserved]=${state.isReserved}`,
  );

  const handleInputChange = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked;
    setState((prevState) => {
      setUrl(
        `transaction?${Object.keys(prevState)
          .filter((key) => key !== fieldName)
          .map(
            (key) =>
              `filters[${key}]=${prevState[key as keyof typeof prevState]}`,
          )
          .join('&')}&filters[${fieldName}]=${checked}${
          bank ? `&filters[bank]=${bank}` : ''
        }`,
      );
      return {
        ...prevState,
        [fieldName]: checked,
      };
    });
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setBank(value);
    setUrl(
      `transaction?filters[isPaid]=${state.isPaid}&filters[isReserved]=${state.isReserved}&filters[bank]=${value}`,
    );
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const hasRowsSelected = rowSelectionModel.length;

  const postData = usePostData('transaction/run-process');

  const handleSubmit = async (idProcess: number) => {
    const response = await postData({
      idProcess,
      rowsToUpdate: rowSelectionModel,
    });

    toast.success(response.message);
  };

  return (
    <div className="overflow-x-auto">
      <FormLabel>Is paid?</FormLabel>
      <Switch
        checked={state.isPaid}
        onChange={(e) => handleInputChange('isPaid', e)}
      />
      <FormLabel>Is reserved?</FormLabel>
      <Switch
        checked={state.isReserved}
        onChange={(e) => handleInputChange('isReserved', e)}
      />
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <FormControl className="className">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleRadioButtonChange}
          >
            {data?.map((item: TODO) => (
              <FormControlLabel
                key={item._id}
                value={item._id}
                control={<Radio />}
                label={item.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </ButtonGroup>
      <Link
        to="/transaction/create"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add transaction
      </Link>

      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disabled={!hasRowsSelected}
      >
        Run process
      </Button>
      <DialogForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        data={rowSelectionModel}
      />
      <Table
        name="transaction"
        key={url}
        columns={columns}
        url={url}
        rowSelection={rowSelectionModel}
        setRowSelection={setRowSelectionModel}
      />
    </div>
  );
};
