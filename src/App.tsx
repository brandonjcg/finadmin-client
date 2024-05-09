import { Sidebar } from './modules';

const App = () => {
  return (
    <div className="flex flex-1 bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-500">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                  <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                      FinAdmin 👨🏽‍💻🚀
                    </h2>
                    <h3 className="text-xl font-semibold text-gray-600 sm:text-2xl lg:text-3xl">
                      Developed by Brandon Castillo
                    </h3>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                      Sistema para administrar finanzas personales
                    </p>
                  </div>

                  <p className="text-center text-gray-600 textbase mt-9">
                    Developed by{' '}
                    <a
                      href="https://github.com/brandonjcg/"
                      title=""
                      className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                    >
                      Brandon Castillo
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default App;
