'use client';

import React, {useEffect, useState } from 'react';
import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FiPlusCircle } from "react-icons/fi";
import { useSession } from "next-auth/react";

const SideBar = ({setCurrentlySelectedFileHandler}: {setCurrentlySelectedFileHandler: (file: File) => void}) => {
  const [expand, setExpand] = useState(0);  
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: session, status } = useSession();
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(()=>{
    setFiles(session?.user?.files);
    console.log('files',files);
  }, [session])

  const setCurrentlySelectedFile = (file : File) => {
    setCurrentlySelectedFileHandler(file);
  }


  const toggleExpand = () => {
    if (expand === 0) {
      setExpand(15);
      setIsExpanded(true);
    } else {
      setExpand(0);
      setIsExpanded(false);
    }
  };

  const createNewFile = async (title: string, description: string) => {

    if(!title || !description){
      return;
    }
  
      try{
        const response = await fetch('/api/createfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: session?.user?.user?.id,
            title: title,
            content: 'A newly created file',
            description: description,
          }),
        })

        const data = await response.json();
        setCurrentlySelectedFile(data);
        setShowCreateFileModal(false);
        setFiles([...files, data]);

      }catch(err){
        console.log(err);
      }
  }


  return (
    <div className='h-full bg-black flex flex-row items-center justify-center'>
      <div className='flex flex-col h-full transition-all duration-100 overflow-hidden' style={{ width: `${expand}vw` }}>
        {showCreateFileModal ? (<CreateNewFileModal setShowCreateFileModal={setShowCreateFileModal} createNewFile={createNewFile}/> ) : null}
        <ProfileSection />
        {isExpanded ? (
          <FilesList setCurrentlySelectedFile={setCurrentlySelectedFile} setShowCreateFileModal={setShowCreateFileModal} files={files}/>
        ): null}
      </div>
      <div className='flex flex-col h-full items-center justify-center'>
        {isExpanded ? <RiExpandLeftLine className=" text-white cursor-pointer" onClick={()=>toggleExpand()}/> : <RiExpandRightLine className=" text-white cursor-pointer" onClick={()=>toggleExpand()}/>}
      </div>
  </div>
  );
};

export default SideBar;

type File = {
  title: string;
  content: string;
  description: string;
};



const FilesList = ({setCurrentlySelectedFile, setShowCreateFileModal, files}: {setCurrentlySelectedFile: (file: File) => void, setShowCreateFileModal: ()=>void, files: File[]}) => {
  

  return (
    <div className="flex flex-col w-full h-fit border-t-[1px] border-dotted border-gray-600 ">
      <div className='flex flex-col gap-2 w-full'>
        {files?.map((file) => (
          <div className='flex flex-col  p-2 w-full hover:bg-gray-700' key={file.title} onClick={()=>setCurrentlySelectedFile(file)}>
            <p className='text-white text-sm font-bold'>{file.title}</p>
            <p className='text-gray-400 text-xs'>{file.description}</p>
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

const ProfileSection = () => {
  const { data: session, status } = useSession();
  return(
    <div className='flex flex-row p-2 items-center gap-2 mt-2 mb-4'>
        <img src={session?.user?.user?.image} className='h-10 w-10 rounded-full'/>
        <div className='flex flex-col'>
          <p className='text-white text-sm font-bold capitalize'>{session?.user?.user?.name}</p>
          <p className='text-gray-400 text-xs'>{session?.user?.user?.email}</p>
        </div>
      </div>
  )
}

const CreateNewFileModal = ({setShowCreateFileModal, createNewFile}: {setShowCreateModal: ()=>void, createNewFile: (title:string, description:string)=>File[]}) => {
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