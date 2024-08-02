'use client'

import React from 'react'
import { Text } from '@chakra-ui/react'

export const Divider = () => {
  return (
    <div className='flex flex-row w-full gap-2 mt-2 mb-2 items-center'>
        <div className='flex-grow bg-gray-300 h-[1px]' />
        <Text fontSize='md' fontWeight='light' color='gray.500'>
            OR
        </Text>
        <div className='flex-grow bg-gray-300 h-[1px]' />
  </div>
  )
}
