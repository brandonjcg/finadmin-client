import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './modules/core/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LoadingProvider>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </LoadingProvider>,
);

// TODO: add unit test
// TODO: try create select with input text component
// TODO: add functionality to order and filters
