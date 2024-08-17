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

import { compileMarkdown } from '@/utils/MarkdownCompliler';

import SideBar from '../component/SideBar';


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

  useEffect(() => {
    const timer = setTimeout(() => {
      saveFile();
    }, 500);
    return () => {
      clearTimeout(timer);
    }
  }, [markdown]);

  

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
      setCurrentlySelectedFile(data);
    } catch (err) {
      console.log(err);
    }
  };

  


  return (
    <div className="w-screen h-screen flex flex-row">
      <div className='flex flex-row w-full h-full'>
        <SideBar setCurrentlySelectedFileHandler={setCurrentlySelectedFileHandler} files={files} />
        <div className="markdown-body w-full h-full overflow-scroll flex flex-row ">
          <div className='flex flex-col w-full h-full bg-gray-800 p-2'>
            <h1 className='text-green-500'>Editor</h1>
            <textarea 
              className="w-full h-full bg-gray-800 text-white resize-none" 
              value={markdown}
              onChange={(e)=>setMarkdown(e.target.value)} 
            />
            <button onClick={saveFile}>Save</button>
          </div>
        </div>
        <div className="markdown-body w-full h-full overflow-scroll p-6">
          <h1 className='text-green-500'>{title}</h1>
            <Markdown className="p-4" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
            {compileMarkdown(markdown)}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
