import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link
        to="/transactions"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Transactions
      </Link>

      <Link
        to="/banks"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Banks
      </Link>
    </div>
  );
};
