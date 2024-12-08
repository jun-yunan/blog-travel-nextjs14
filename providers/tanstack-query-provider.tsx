'use client';

import { FunctionComponent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanstackQueryProviderProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient({});

const TanstackQueryProvider: FunctionComponent<TanstackQueryProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
