'use client';

import React, {useEffect, useState } from 'react';
import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FiPlusCircle } from "react-icons/fi";
import { useSession } from "next-auth/react";

import FilesList from './sidebar/FilesList';
import ProfileSection from './sidebar/ProfileSection';
import CreateNewFileModal from './sidebar/CreateNewFileModal';

interface CustomSession {
    user: {
        additionalData: {
            user: {
                id: string;
            }
        }
    }
}

interface File {
    id: string;
    title: string;
    description: string;
    content: string;
}





const SideBar = ({setCurrentlySelectedFileHandler, files}: {setCurrentlySelectedFileHandler: (file: File) => void, files: File[]}) => {
  const [expand, setExpand] = useState(15);  
  const [isExpanded, setIsExpanded] = useState(true);
  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const {data: session} = useSession();

  

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
            user_id: session?.user?.additionalData?.user?.id,
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
    <div className='h-full bg-black flex flex-row items-center justify-center '>
      <div className='flex flex-col h-full transition-all duration-100 overflow-scroll' style={{ width: `${expand}vw` }}>
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










