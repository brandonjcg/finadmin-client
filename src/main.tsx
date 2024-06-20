import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { LoadingProvider } from './modules';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </ThemeProvider>,
);

// TODO: add unit test
// TODO: try create select with input text component
// TODO: add functionality to order and filters
