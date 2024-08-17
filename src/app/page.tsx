'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';
import { FiSave } from 'react-icons/fi';
import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { compileMarkdown } from '@/utils/MarkdownCompliler';
import { Circles } from 'react-loader-spinner'


import SideBar from '../component/SideBar';
import CustomFunctions from '../component/functions/CustomFunctions';
import { time } from 'console';


export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState(null);
  const [title, setTitle] = useState('');
  interface File {
    id: string;
    title: string;
    description: string;
    content: string;

  }
  
  const [currentlySelectedFile, setCurrentlySelectedFile] = useState<File | null>(null);
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [markdown, setMarkdown] = useState(`
    # A demo of \`react-markdown\`
  
    \`react-markdown\` is a markdown component for React.
  
    👉 Changes are re-rendered as you type.
  
    👈 Try writing some markdown on the left.
  
    ## Overview
    ...`);

  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/hero');
    }
    if (status === 'loading') {
      return;
    }
  }, [status, session]);

  const setCurrentlySelectedFileHandler = (file: File) => {
    setCurrentlySelectedFile(file);
    setMarkdown(file.content);
    setTitle(file.title);
  };

  useEffect(() => {
    console.log('fetching user data');
    const fetchUserData = async () => {
      if (!session) return;
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: session?.user?.additionalData?.user?.id,
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
          }),
        });

        const data = await response.json();
        console.log(data);
        setUserData(data);
        setFiles(data.files);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
    
  }, [session, currentlySelectedFile, ]);

  

  

  const saveFile = async () => {
    if (!currentlySelectedFile) {
      return;
    }

    try {
      const response = await fetch('/api/updatefilecontent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: markdown,
          file_id: currentlySelectedFile.id,
        }),
      });

      const data = await response.json();
      setSaved(true);
      setCurrentlySelectedFile(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setSaved(false);
    const timeout = setTimeout(() => {
      saveFile();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [markdown]);

  const handleCustomFunction = () =>{
    setMarkdown(prev => prev + '\n<H1>Heading H1</H1>');
  }

  


  return (
    <div className="w-screen h-screen flex flex-row">
      <div className='flex flex-row w-full h-full'>
        <SideBar setCurrentlySelectedFileHandler={setCurrentlySelectedFileHandler} files={files} />
        <div className="w-full h-full overflow-scroll flex flex-col">
          <div className='flex flex-col w-full h-full bg-gray-800 p-2'>
            <div className='flex flex-row bg-gray-700 h-10 rounded-t-lg items-center p-2'>
              <div className='absolute flex flex-row gap-2'>
                <RiExpandLeftLine className='text-white text-md cursor-pointer bg-red-400 rounded-lg'/>
                <RiExpandRightLine className='text-white text-md cursor-pointer bg-blue-400 rounded-lg'/>
                <FiSave className='text-white text-md cursor-pointer bg-green-400 rounded-lg' onClick={saveFile}/>
              </div>
               <p className='text-white font-bold w-full text-center'>{title}</p>
               {!saved  ? (<Circles color='#ffffff' height="20" width="20"/>) : (<p className='text-gray-400 text-sm'>Saved</p>)}
            </div>
            
            <textarea 
              className="w-full h-full bg-black text-white p-4 text-sm leading-relaxed font-mono focus:outline-none focus:none focus:ring-blue-500 resize-none font-bold" 
              value={markdown}
              onChange={(e)=>setMarkdown(e.target.value)} 
            />
          </div>
          <CustomFunctions setMarkdown={setMarkdown} />


        </div>
        <div className="w-full h-full overflow-scroll flex flex-row ">
          <div className='flex flex-col w-full h-full bg-gray-800 p-2'>
            <div className='flex flex-row bg-gray-700 h-10 rounded-t-lg items-center p-2'>
              <div className='absolute flex flex-row gap-2'>
                <RiExpandLeftLine className='text-white text-md cursor-pointer bg-red-400 rounded-lg'/>
                <RiExpandRightLine className='text-white text-md cursor-pointer bg-blue-400 rounded-lg'/>
                <FiSave className='text-white text-md cursor-pointer bg-green-400 rounded-lg' onClick={saveFile}/>
              </div>
               <p className='text-white font-bold w-full text-center'>Markdown Render</p>
            </div>

            <div className="markdown-body w-full h-full overflow-scroll p-6">
            <Markdown className="p-4 " remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
            {compileMarkdown(markdown)}
          </Markdown>
        </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}
