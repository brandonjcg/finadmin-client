import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { LoadingProvider } from './modules';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>,
);

// TODO: add unit test
// TODO: try create select with input text component
// TODO: add functionality to order and filters
