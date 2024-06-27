import { useFetchData } from '@/modules';
import { IBankSelect } from '../types';

export const Banks = () => {
  const { data: banks } = useFetchData<IBankSelect>({ url: 'bank/select' });

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-4">Banks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {banks.map((bank) => (
          <div
            key={bank._id}
            className="flex flex-col items-center bg-white rounded-lg border shadow-md p-4"
          >
            <img src={bank.logo} alt={bank.text} className="w-16 h-16" />
            <span className="mt-2 text-lg font-semibold">{bank.text}</span>
          </div>
        ))}
      </div>
    </>
  );
};
