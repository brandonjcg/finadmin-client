import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, List } from '@mui/material';
import {
  FiltersTransaction,
  IBankSelect,
  buildError,
  useFetchData,
} from '@/modules';
import { TotalCard } from './TotalCard';
import { TotalsItem } from './TotalsItem';

const URL_API_SERVER = `${import.meta.env.VITE_API_SERVER_URL}`;

export const Totals = () => {
  const { data: banks } = useFetchData<IBankSelect>({ url: 'bank/select' });
  const [checked, setChecked] = useState<string[]>([]);
  const [total, setTotal] = useState('');
  const [isPaidChecked, setIsPaidChecked] = useState<string | boolean>('empty');
  const [isReservedChecked, setIsReservedChecked] = useState<string | boolean>(
    'empty',
  );
  const haveChecked = checked.length;

  const handleSubmit = async () => {
    try {
      const params = {
        ids: checked.join(','),
      } as Record<string, string | boolean>;

      if (isPaidChecked !== 'empty') params.isPaid = isPaidChecked;
      if (isReservedChecked !== 'empty') params.isReserved = isReservedChecked;

      const response = await axios.get(
        `${URL_API_SERVER}transaction/bank/group`,
        {
          params,
          withCredentials: true,
        },
      );

      const total = response?.data?.data?.total;
      const totalFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total);

      setTotal(totalFormatted);

      return response;
    } catch (error) {
      buildError(error);
    }
  };

  return (
    <Box>
      <h1 className="text-center font-bold text-2xl mb-4">Totals grouped</h1>
      <FiltersTransaction
        isPaidChecked={isPaidChecked}
        setIsPaidChecked={setIsPaidChecked}
        isReservedChecked={isReservedChecked}
        setIsReservedChecked={setIsReservedChecked}
      />
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <List>
              {banks?.map((item) => (
                <TotalsItem
                  key={item._id}
                  item={item}
                  checked={checked}
                  setChecked={setChecked}
                  setTotal={setTotal}
                />
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <TotalCard total={total} />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!haveChecked}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
};
