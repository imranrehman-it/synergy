'use client';

import React from 'react'
import { Text } from '@chakra-ui/react'

export const Heading = () => {
  return (
    <>
        <Text as='h2' fontSize={{ base: '2xl', md: '3xl' }} fontWeight='medium'>
          Login to your account
        </Text>
        <Text fontSize='md' fontWeight='light' color='gray.500'>
          Synergize your work flows for everyone
        </Text>
    </>
    
  )
}
