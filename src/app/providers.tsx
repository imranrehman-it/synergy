// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import '../app/globals.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}