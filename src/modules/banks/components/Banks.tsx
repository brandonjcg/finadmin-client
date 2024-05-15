import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { IResponseAxios, LoadingContext } from '@/modules';
import { IBank } from '../types';

const url = `${import.meta.env.VITE_API_SERVER_URL}bank`;

export const Banks = () => {
  const [banks, setBanks] = useState<IBank[]>([]);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchBanks = async () => {
      setIsLoading(true);
      const response = await axios.get<IResponseAxios>(url);
      setBanks(response.data.data.rows || []);
      setIsLoading(false);
    };

    fetchBanks();
  }, [setIsLoading]);

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-4">Banks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {banks.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center bg-white rounded-lg border shadow-md p-4"
          >
            <img src={bank.logo} alt={bank.name} className="w-16 h-16" />
            <span className="mt-2 text-lg font-semibold">{bank.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
