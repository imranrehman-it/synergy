// app/page.tsx
'use client';
import { Link } from '@chakra-ui/next-js';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session]);

  return (
    <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
      About
    </Link>
  );
}
