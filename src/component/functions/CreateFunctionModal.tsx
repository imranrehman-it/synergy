import React from 'react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { compileMarkdown } from '@/utils/MarkdownCompliler'


const CreateFunctionModal = ({addNewFunction} : (value: string, template:string) => void) => {
    const [markdown, setMarkdown] = useState(`<H1>Heading 1</H1>`);
    const [functionTag, setFunctionTag] = useState('');

    const handleSetFunctionTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunctionTag(`<${e.target.value}/>`);
    }
  return (
     <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
        <div className=" flex flex-col w-1/2 h-1/2 bg-gray-700 rounded-md p-4">
            <h1 className="text-xl font-semibold text-white">Create new function</h1>
            <div className="flex flex-row gap-2 w-full h-full">
                <div className='flex flex-col w-1/2 h-full gap-2'>
                <textarea 
                    className=" bg-black
                     h-full rounded-md text-white p-4 text-sm leading-relaxed font-mono focus:outline-none focus:none focus:ring-blue-500 resize-none font-bold" 
                    value={markdown}
                    onChange={(e)=>setMarkdown(e.target.value)} 
                />
                <div className='flex flex-row w-full'>
                    <input onChange={(e)=>handleSetFunctionTag(e)} type="text" placeholder="Function Tag ie <newfunction>" className="bg-black rounded-md text-white p-4 text-sm leading-relaxed font-mono focus:outline-none focus:none focus:ring-blue-500 resize-none font-bold"/>  
                    <button onClick={()=>addNewFunction(functionTag, markdown)} className='bg-green-400 text-white p-2 rounded-md'>Add</button>
                </div>

                </div>
               
                <div className="markdown-body w-1/2 h-full overflow-scroll p-6 rounded-md">
                <Markdown className="p-4" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>
                {compileMarkdown(markdown)}
                </Markdown>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CreateFunctionModal