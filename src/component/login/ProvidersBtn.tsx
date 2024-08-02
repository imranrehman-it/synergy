'use client';

import React from 'react'
import {signIn} from "next-auth/react"
import GoogleIcon from '../../../public/googleicon.svg';
import GithubIcon from '../../../public/githubicon.svg';
import { Button } from '@chakra-ui/react';

export const ProvidersBtn = () => {
  return (
    <>
        <Button leftIcon={<GoogleIcon />} onClick={()=>signIn('google')} fontWeight='md' width='full' size='md' >
          Continue with Google
        </Button>
        <Button leftIcon={<GithubIcon />} onClick={()=>signIn('github')} fontWeight='md' width='full' size='md' >
          Continue with Github
        </Button>
    </>
  )
}
