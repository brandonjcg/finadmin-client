import { useState, useMemo, useCallback } from 'react';
import { LoadingContext } from '../context';
import { LoadingProviderProps } from '../types';

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = useCallback(
    () => setLoadingCount((count) => count + 1),
    [],
  );
  const decrementLoading = useCallback(
    () => setLoadingCount((count) => count && count - 1),
    [],
  );

  const contextValue = useMemo(
    () => ({ loadingCount, incrementLoading, decrementLoading }),
    [loadingCount, incrementLoading, decrementLoading],
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
