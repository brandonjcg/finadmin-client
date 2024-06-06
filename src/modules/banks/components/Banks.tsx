import { useFetchData } from '@/modules/core';
import { IBank } from '../types';

export const Banks = () => {
  const { data: banks } = useFetchData<IBank>('bank/select');

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-4">Banks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {banks.map((bank) => (
          <div
            key={bank._id}
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
