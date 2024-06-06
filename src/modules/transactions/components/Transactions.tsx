import { TODO, useFetchData } from '@/modules';
import { Link } from 'react-router-dom';

export const Transactions = () => {
  const { data } = useFetchData<TODO>('transaction');

  return (
    <div className="overflow-x-auto">
      <Link
        to="/transactions/create"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Transaction
      </Link>
      <table className="min-w-full divide-y divide-gray-200 dark:bg-gray-800 text-white">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Bank
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Store
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Concept
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Is reserved?
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Is paid?
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Additional comments
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.bankName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.store}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.concept}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.isReserved}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.isPaid}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.additionalComments}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
