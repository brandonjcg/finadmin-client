export const Dashboard = () => {
  const items = [
    { nombre: 'BBVA', total: 1243.34 },
    { nombre: 'Nu', total: 94.39 },
  ];
  const deuda = items.reduce((acc, item) => acc + item.total, 0);
  const fechaActual = new Date().toLocaleDateString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-indigo-50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Deuda</h2>
        <p className="text-purple-600">
          Cantidad total de deuda:{' '}
          <span className="font-bold text-purple-800">{deuda}</span>
        </p>
      </div>

      <div className="bg-indigo-50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          Total por bancos
        </h2>
        <table className="min-w-full divide-y divide-purple-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                Tipo de Banco
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-200">
            {items.map((tipo) => (
              <tr key={tipo.nombre}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-600">
                  {tipo.nombre}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-purple-600">
                  {tipo.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-indigo-50 shadow-lg rounded-lg p-6">
        <p className="text-purple-600">
          Fecha Actual:{' '}
          <span className="font-bold text-purple-800">{fechaActual}</span>
        </p>
      </div>

      <div className="bg-indigo-50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          Tendencia de deuda
        </h2>
        <div
          className="chart-container"
          style={{ height: '300px', width: '100%' }}
        ></div>
      </div>
    </div>
  );
};
