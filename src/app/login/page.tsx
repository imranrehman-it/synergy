'use client';
import * as React from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import GoogleIcon from '../../../public/googleicon.svg'
import GithubIcon from '../../../public/githubicon.svg'
import Logo from '../../../public/logo.svg'

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen '>
      <div className='flex flex-col items-center w-fit'>
        <Logo className='w-20 h-20 mb-16'/>
        <h2 className='text-3xl font-medium leading-9 '>Login in to your account</h2>
        <p className="text-md font-light text-gray-500 mt-4">Start making your dreams come true</p>
        <Input placeholder='Enter your email' width='96' mt='50px'/>
        <Button colorScheme='blue' fontWeight='semi' fontSize='md' width='96' className='mt-4' size='md'>Continue with email</Button>
        <p className="text-md font-light text-gray-500 mt-4">OR</p>
        <Button leftIcon={<GoogleIcon/>} fontWeight='md' width='96' className='mt-4' size='md'>Continue with Google</Button>
        <Button leftIcon={<GithubIcon />} fontWeight='md' width='96' className='mt-4' size='md'>Continue with Github</Button>
        
      
      </div>
      

    </div>
  );
}