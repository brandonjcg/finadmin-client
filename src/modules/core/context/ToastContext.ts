import { createContext } from 'react';

type ToastContextType = {
  showToast: (message: string, type: string) => void;
};

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});
