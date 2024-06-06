import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ISelectOption,
  LoadingContext,
  ToastContext,
  buildError,
  useFetchData,
} from '@/modules';

// TODO: Create components: select, input

const url = `${import.meta.env.VITE_API_SERVER_URL}`;

export const TransactionForm = () => {
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [bank, setBank] = useState('');

  const { data: banks } = useFetchData<ISelectOption>('bank/select');

  const { showToast } = useContext(ToastContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const payload = {
        bank,
        concept: data.get('concept'),
        store: data.get('store'),
        amount: Number(data.get('amount')),
        date: data.get('date'),
        isReserved: data.get('isReserved') === 'on',
        isPaid: data.get('isPaid') === 'on',
      };

      setIsLoading(true);

      await axios.post(`${url}transaction`, payload);

      navigate('/transactions');
    } catch (error) {
      alert(buildError(error));
      showToast(buildError(error), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Banco
          </label>
          <select
            name="bank"
            onChange={(e) => setBank(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-gray-700"
          >
            <option value="">Seleccionar banco</option>
            {banks.map((item) => (
              <option key={item._id} value={item._id}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Concepto
          </label>
          <input
            type="text"
            name="concept"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Tienda
          </label>
          <input
            type="text"
            name="store"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Cantidad
          </label>
          <input
            type="number"
            name="amount"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Fecha
          </label>
          <input
            type="date"
            name="date"
            className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isReserved"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 bg-gray-800"
          />
          <label className="ml-2 text-sm text-gray-300">¿Está reservado?</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isPaid"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 bg-gray-800"
          />
          <label className="ml-2 text-sm text-gray-300">¿Está pagado?</label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear
        </button>
      </form>
    </div>
  );
};
