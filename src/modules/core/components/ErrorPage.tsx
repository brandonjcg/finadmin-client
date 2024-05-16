import { Link } from 'react-router-dom';

interface ErrorPageProps {
  error?: {
    status: number;
    statusText: string;
    message: string;
  };
}

export const ErrorPage = ({ error }: Readonly<ErrorPageProps>) => {
  const errorMessage =
    error?.statusText ?? error?.message ?? 'Página no encontrada';
  const errorStatus = error?.status ?? 404;

  return (
    <div
      id="error-page"
      className="bg-indigo-600 flex items-center justify-center h-screen"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">{errorStatus}</h1>
        <p className="text-lg text-indigo-200 mt-2">{errorMessage}</p>
        <br />
        <Link
          to="/"
          className="mt-6 px-6 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-full border border-indigo-600 hover:text-white hover:bg-indigo-500"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};
