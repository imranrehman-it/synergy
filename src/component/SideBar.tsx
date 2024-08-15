'use client';

import React, {useState } from 'react';
import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FiPlusCircle } from "react-icons/fi";

const SideBar = () => {
  const [expand, setExpand] = useState(0);  
  const [isExpanded, setIsExpanded] = useState(false);



  const toggleExpand = () => {
    if (expand === 0) {
      setExpand(15);
      setIsExpanded(true);
    } else {
      setExpand(0);
      setIsExpanded(false);
    }
  };

  return (
    <div className='h-full bg-black flex flex-rowitems-center justify-center'>
      <div className='flex flex-col h-full transition-all duration-100 overflow-hidden' style={{ width: `${expand}vw` }}>
        {isExpanded ? (
          <FilesList />
        ): null}
      </div>
      <div className='flex flex-col h-full items-center justify-center'>
        {isExpanded ? <RiExpandLeftLine className=" text-white cursor-pointer" onClick={()=>toggleExpand()}/> : <RiExpandRightLine className=" text-white cursor-pointer" onClick={()=>toggleExpand()}/>}
      </div>
  </div>
  );
};


const ExpandButton = ({ isExpanded, toggleExpand }: { isExpanded: boolean, toggleExpand: () => void }) => {
  return (
    <div className="flex items-center justify-center">
      {isExpanded ? (
        <RiExpandLeftLine
          className="text-2xl text-white cursor-pointer"
          onClick={toggleExpand}
        />
      ) : (
        <RiExpandRightLine
          className="text-2xl text-white cursor-pointer"
          onClick={toggleExpand}
        />
      )}
    </div>
  );
};

export default SideBar;

const FilesList = () => {
  return (
    <div className="flex flex-col w-full h-fit p-2 rounded-sm">
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex flex-col  p-2 w-full hover:bg-gray-700'>
          <p className='text-white text-sm font-bold'>Synergy</p>
          <p className='text-gray-400 text-xs'>Document hightlighting the power of synergy</p>
        </div>
        <div className='flex flex-col  p-2 w-full hover:bg-gray-700'>
          <p className='text-white text-sm font-bold'>Synergy</p>
          <p className='text-gray-400 text-xs'>Document hightlighting the power of synergy</p>
        </div>
        <div className='flex flex-col  p-2 w-full hover:bg-gray-700'>
          <p className='text-white text-sm font-bold'>Synergy</p>
          <p className='text-gray-400 text-xs'>Document hightlighting the power of synergy</p>
        </div>
        <div className='flex flex-col  p-2 w-full hover:bg-gray-700'>
          <p className='text-white text-sm font-bold'>Synergy</p>
          <p className='text-gray-400 text-xs'>Document hightlighting the power of synergy</p>
        </div>
        <div className='flex flex-col  p-2 w-full hover:bg-gray-700'>
          <div className='flex flex-row gap-1 items-center'>
            <FiPlusCircle className='text-green-300'/>
            <p className='text-green-300 text-sm font-bold'>Create New File</p>
          </div>
          <p className='text-gray-400 text-xs'>Click here to create a new file</p>
        </div>

      </div>
      
    </div>
  );
}