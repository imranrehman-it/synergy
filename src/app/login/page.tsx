'use client';
import * as React from 'react';

import { Button, Input, VStack, Text, Box } from '@chakra-ui/react';
import GoogleIcon from '../../../public/googleicon.svg';
import GithubIcon from '../../../public/githubicon.svg';
import Logo from '../../../public/logo.svg';

export default function Login() {
  return (
    <Box className='flex flex-col items-center justify-center w-screen h-screen px-4'>
      <VStack spacing={4} width={{ base: 'full', sm: 'md' }} maxW='96'>
        <Logo className='w-20 h-20 mb-8' />
        <Text as='h2' fontSize={{ base: '2xl', md: '3xl' }} fontWeight='medium'>
          Login to your account
        </Text>
        <Text fontSize='md' fontWeight='light' color='gray.500'>
          Synergize your work flows for everyone
        </Text>
        <Input placeholder='Enter your email' width='full' mt='8' />
        <Button colorScheme='blue' fontWeight='semibold' fontSize='md' width='full' size='md' >
          Continue with email
        </Button>
        <div className='flex flex-row w-full gap-2 mt-2 mb-2 items-center'>
          <div className='flex-grow bg-gray-300 h-[1px]' />
          <Text fontSize='md' fontWeight='light' color='gray.500'>
            OR
          </Text>
          <div className='flex-grow bg-gray-300 h-[1px]' />
        </div>
        <Button leftIcon={<GoogleIcon />} fontWeight='md' width='full' size='md' >
          Continue with Google
        </Button>
        <Button leftIcon={<GithubIcon />} fontWeight='md' width='full' size='md' >
          Continue with Github
        </Button>
      </VStack>
    </Box>
  );
}
