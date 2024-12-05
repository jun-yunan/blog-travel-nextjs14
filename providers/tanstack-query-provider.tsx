'use client';

import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

const TanstackQueryProvider: FunctionComponent<TanstackQueryProviderProps> = ({
  children,
}) => {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
