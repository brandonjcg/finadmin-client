import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-screen flex justify-center items-center">
      <button
        className="text-white text-4xl py-10 px-20 bg-transparent border border-white rounded hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out transform hover:scale-105 w-11/12 h-5/6"
        onClick={() => setCount(count + 1)}
      >
        Incrementar: {count}
      </button>
    </div>
  );
}

export default App;
