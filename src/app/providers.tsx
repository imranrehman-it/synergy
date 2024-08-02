'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ChakraProvider>
  );
}
