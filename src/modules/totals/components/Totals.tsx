import { useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { IBankSelect, useFetchData } from '@/modules';
import { TotalCard } from './TotalCard';

const URL_API_SERVER = `${import.meta.env.VITE_API_SERVER_URL}`;

export const Totals = () => {
  const { data: banks } = useFetchData<IBankSelect>({ url: 'bank/select' });
  const [checked, setChecked] = useState<string[]>([]);
  const haveChecked = checked.length;
  const [total, setTotal] = useState('');

  const handleToggle = (value: string) => () => {
    const newChecked = [...checked];

    newChecked.includes(value)
      ? newChecked.splice(newChecked.indexOf(value), 1)
      : newChecked.push(value);

    setChecked(newChecked);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${URL_API_SERVER}transaction/bank/group`,
        {
          params: {
            ids: checked.join(','),
          },
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
      console.log('🚀 ~ handleSubmit ~ error:', error);
    }
  };

  return (
    <Box>
      <h1 className="text-center font-bold text-2xl mb-4">Totals grouped</h1>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <List>
              {banks.map((item) => {
                const id = item._id;
                const idLabel = `checkbox-list-label-${id}`;
                return (
                  <ListItem
                    key={id}
                    onClick={handleToggle(id)}
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(id)}
                        checked={checked.indexOf(id) !== -1}
                        inputProps={{ 'aria-labelledby': idLabel }}
                      />
                    }
                    disablePadding
                    className="bg-gray-800 mb-2 rounded"
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar alt={`img-°${id + 1}`} src={item.logo} />
                      </ListItemAvatar>
                      <ListItemText id={idLabel} primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
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
