'use client';
import React from 'react'
import { useSession } from 'next-auth/react'


const ProfileSection = () => {
    const { data: session, status } = useSession();
    return(
      <div className='flex flex-row p-2 items-center gap-2 mt-2 mb-4'>
          <img src={session?.user?.image} className='h-10 w-10 rounded-full'/>
          <div className='flex flex-col'>
            <p className='text-white text-sm font-bold capitalize'>{session?.user?.name}</p>
            <p className='text-gray-400 text-xs'>{session?.user?.email}</p>
          </div>
        </div>
    )
  }

export default ProfileSection;
