import { TODO, Table, useFetchData } from '@/modules';
import {
  ButtonGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import { useState } from 'react';
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

export const Transactions = <T,>() => {
  const { data } = useFetchData<T>({
    url: 'bank/select',
  });
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [bank, setBank] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(
    `transaction?filters[isPaid]=${isPaid}`,
  );

  const handleIsPaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsPaid(checked);
    setUrl(
      `transaction?filters[isPaid]=${checked}${
        bank ? `&filters[bank]=${bank}` : ''
      }`,
    );
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setBank(value);
    setUrl(`transaction?filters[isPaid]=${isPaid}&filters[bank]=${value}`);
  };

  return (
    <div className="overflow-x-auto">
      <FormLabel>Is paid?</FormLabel>
      <Switch checked={isPaid} onChange={handleIsPaidChange} />
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
      <Table name="transaction" key={url} columns={columns} url={url} />
    </div>
  );
};
