import { createContext } from 'react';

type LoadingContextType = {
  loadingCount: number;
  incrementLoading: () => void;
  decrementLoading: () => void;
};

export const LoadingContext = createContext<LoadingContextType>({
  loadingCount: 0,
  incrementLoading: () => {},
  decrementLoading: () => {},
});
