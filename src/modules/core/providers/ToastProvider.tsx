import { useCallback, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { LoadingProviderProps } from '../types';
import { ToastContext } from '../context';
import { Alert, AlertColor } from '@mui/material';

export const ToastProvider = ({ children }: LoadingProviderProps) => {
  const [toast, setToast] = useState<string | null>(null);
  const [type, setType] = useState<string>();

  const showToast = useCallback((message: string, type: string) => {
    setToast(message);
    setType(type);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={!!toast}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          severity={type as AlertColor}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
