// app/page.tsx
'use client';
import { Link } from '@chakra-ui/next-js';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Navbar from '../component/main/Navbar';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/hero');
    }
    console.log(session);
  }, [status, session]);

  return (
    <>
      <Navbar />
     
    </>
  );
}
