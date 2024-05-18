import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from '@material-tailwind/react';
import { ISelectOption, LoadingContext } from '@/modules';

// TODO: Create components: select, input

const url = `${import.meta.env.VITE_API_SERVER_URL}`;

export const TransactionForm = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const [banks, setBanks] = useState<ISelectOption[]>([]);
  const [stores, setStores] = useState<ISelectOption[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [banksResponse, storesResponse] = await Promise.all([
          axios.get(`${url}bank/select`),
          axios.get(`${url}transaction/store/select`),
        ]);

        setBanks(banksResponse.data.data || []);
        setStores(storesResponse.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  const [bank, setBank] = useState('');
  const [store, setStore] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      console.log('🚀 ~ handleSubmit ~ data:', data);
      const payload = {
        bank,
        concept: data.get('concept'),
        store,
        amount: Number(data.get('amount')),
        date: data.get('date'),
        isReserved: data.get('isReserved') === 'on',
        isPaid: data.get('isPaid') === 'on',
      };

      setIsLoading(true);

      await axios.post(`${url}transaction`, payload);

      navigate('/transactions');
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Create transaction
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Banco
            </Typography>
            <Select
              size="lg"
              name="bank"
              onChange={(value) => value && setBank(value)}
            >
              {banks.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.text}
                </Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Concept
            </Typography>
            <Input
              size="lg"
              name="concept"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Store
            </Typography>
            <Select
              size="lg"
              name="store"
              onChange={(value) => value && setStore(value)}
            >
              {stores.map((item) => (
                <Option key={item.text} value={item.text}>
                  {item.text}
                </Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Amount
            </Typography>
            <Input
              size="lg"
              name="amount"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              type="number"
              crossOrigin={undefined}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Date
            </Typography>
            <Input
              size="lg"
              name="date"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
            />

            <Checkbox
              name="isReserved"
              label={
                <Typography variant="h6" color="blue-gray">
                  Is reserved?
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
              crossOrigin={undefined}
            />

            <Checkbox
              name="isPaid"
              label={
                <Typography variant="h6" color="blue-gray">
                  Is paid?
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
              crossOrigin={undefined}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};
