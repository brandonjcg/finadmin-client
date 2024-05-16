import { useState, useMemo } from 'react';
import { LoadingContext } from '../context';
import { TODO } from '../types';

export const LoadingProvider = ({ children }: TODO) => {
  const [isLoading, setIsLoading] = useState(false);

  const contextValue = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading],
  );

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
