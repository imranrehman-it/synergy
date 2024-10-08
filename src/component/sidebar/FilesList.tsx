'use client';
import React, {useEffect, useState } from 'react';
import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FiPlusCircle } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";




const FilesList = ({setCurrentlySelectedFile, setShowCreateFileModal, files}: {setCurrentlySelectedFile: (file: File) => void, setShowCreateFileModal: (arg0: boolean)=>void, files: File[]}) => {
    return (
      <div className="flex flex-col w-full h-fit border-t-[1px] border-dotted border-gray-600 ">
        <div className='flex flex-col gap-2 w-full overflow-scroll'>
          {files?.map((file) => (
            <div className='flex flex-col  p-2 w-full hover:bg-gray-700' key={file.id} onClick={()=>setCurrentlySelectedFile(file)}>
              <div className='flex flex-row w-full justify-between'>
              <p className='text-white text-sm font-bold'>{file.title}</p>
              <BsThreeDots onClick={()=>console.log('expand')}className='text-white hover:cursor-pointer z-0'/>
              </div>
              <p className='text-gray-400 text-xs w-[70%]'>{file.description}</p>
            </div>
            ))}
            <div onClick={()=>setShowCreateFileModal(true)}className='flex flex-col  p-2 w-full hover:bg-gray-700'  >
              <div className='flex flex-row gap-1 items-center'>
                <FiPlusCircle className='text-green-400 text-sm'/>
              <p className='text-green-400 text-sm font-bold'>Create new file</p>
              </div>
              <p className='text-gray-400 text-xs'>Click here to create a new file</p>
            </div>
        </div>
        
      </div>
    );
  }

export default FilesList;