'use client';

import React from 'react'
import GoogleIcon from '../../../public/googleicon.svg';
import GithubIcon from '../../../public/githubicon.svg';
import { Button } from '@chakra-ui/react';

export const ProvidersBtn = () => {
  return (
    <>
        <Button leftIcon={<GoogleIcon />} fontWeight='md' width='full' size='md' >
          Continue with Google
        </Button>
        <Button leftIcon={<GithubIcon />} fontWeight='md' width='full' size='md' >
          Continue with Github
        </Button>
    </>
  )
}
