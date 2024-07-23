import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { LoadingProvider } from './modules';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <LoadingProvider>
      <Router>
        <App />
      </Router>
    </LoadingProvider>
  </ThemeProvider>,
);

// TODO: try create select with input text component
