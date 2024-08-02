'use client';
import * as React from 'react';
import { Button, Input, VStack, Text, Box } from '@chakra-ui/react';
import Logo from '../../../public/logo.svg';

import { ProvidersBtn } from '@/component/login/ProvidersBtn';
import { Divider } from '@/component/login/Divider';
import { Heading } from '@/component/login/Heading';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);

  const handleEmailSubmit = () =>{
    if(email === ''){
      setIsInvalid(true);
      return
    }
    setIsInvalid(false);
  }

  React.useEffect (() =>{
    setIsInvalid(false);
  }, [email]);

  return (
    <Box className='flex flex-col items-center justify-center w-screen h-screen px-4'>
      <VStack spacing={4} width={{ base: 'full', sm: 'md' }} maxW='96'>
        <Logo className='w-20 h-20 mb-8' />
        <Heading />
        <Input isInvalid={isInvalid} placeholder='Enter your email' width='full' mt='8' onChange={(e)=>setEmail(e.target.value)} />
        <Button onClick={handleEmailSubmit} colorScheme='blue' fontWeight='semibold' fontSize='md' width='full' size='md' >
          Continue with email
        </Button>
        <Divider />
        <ProvidersBtn />
      </VStack>
    </Box>
  );
}
