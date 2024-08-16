'use client';
import React, { useState } from 'react';

const CreateNewFileModal = ({setShowCreateFileModal, createNewFile}: {setShowCreateFileModal: (arg0: boolean) => void, createNewFile: (title:string, description:string)=>File[]}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
      <div className='flex flex-col w-full h-full bg-black bg-opacity-90 items-center justify-center absolute'>
        <div className='flex flex-col w-1/4 h-1/4 bg-gray-800 p-4 rounded-lg'>
          <h1 className='text-white text-lg font-bold'>Create new file</h1>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Title" className='w-full h-10 bg-gray-700 text-white p-2 rounded-lg mt-2'/>
          <textarea onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className='w-full h-20 bg-gray-700 text-white p-2 rounded-lg mt-2'></textarea>
          <div className='flex flex-row items-center justify-between mt-4'>
            <button onClick={()=>createNewFile(title, description)}className='bg-green-400 text-white p-2 rounded-lg'>Create</button>
            <button onClick={()=>setShowCreateFileModal(false)}className='bg-red-400 text-white p-2 rounded-lg'>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

export default CreateNewFileModal;