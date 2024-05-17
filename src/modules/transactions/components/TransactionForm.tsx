import { useContext, useEffect, useState } from 'react';
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
  const [banks, setBanks] = useState<ISelectOption[]>([]);
  const [store, setStore] = useState<ISelectOption[]>([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchBanks = async () => {
      const response = await axios.get(`${url}bank/select`);
      setBanks(response.data.data || []);
    };
    const fetchStores = async () => {
      const response = await axios.get(`${url}transaction/store/select`);
      setStore(response.data.data || []);
    };

    fetchBanks();
    fetchStores();

    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Create transaction
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Banco
            </Typography>
            <Select size="lg">
              {banks.map((item) => (
                <Option key={item._id}>{item.text}</Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Concept
            </Typography>
            <Input
              size="lg"
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Store
            </Typography>
            <Select size="lg">
              {store.map((item) => (
                <Option key={item._id}>{item.text}</Option>
              ))}
            </Select>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Amount
            </Typography>
            <Input
              size="lg"
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
              className="border-t-blue-gray-200 focus:border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              crossOrigin={undefined}
              type="date"
            />

            <Checkbox
              label={
                <Typography variant="h6" color="blue-gray">
                  Is reserved?
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
              crossOrigin={undefined}
            />

            <Checkbox
              label={
                <Typography variant="h6" color="blue-gray">
                  Is paid?
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
              crossOrigin={undefined}
            />
          </div>

          <Button className="mt-6" fullWidth>
            Create
          </Button>
        </form>
      </Card>
    </div>
  );
};
