import React from 'react'
import { useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { compileMarkdown } from '@/utils/MarkdownCompliler'

const defaultMarkdown = `<bf><red>{content}</red></bf>`

interface Function {
    value: string;
    template: string;
}

const CreateFunctionModal = ({addNewFunction, setShowModal, functionList} : {addNewFunction: (value: string, template:string) => void, setShowModal: (arg0: boolean)=>void, functionList: Function[] })=> {
    const [markdown, setMarkdown] = useState(defaultMarkdown);
    const [functionTag, setFunctionTag] = useState('');
    const [invalid, setInvalid] = useState(false);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFunctionTag(e.target.value);
        functionList.forEach((item)=>{
            if(item.value ===  `<${e.target.value}/>`){
                setInvalid(true);
            }
            else{
                setInvalid(false);
            }
        })
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
                    {invalid ? <p className='text-red-400 text-xs'>Tag already exists</p> : <p className='text-green-400 text-xs'>{`<${functionTag}/></${functionTag}>`}</p>}
                    <div className='flex flex-row w-full gap-2'>
                        <input onChange={(e)=>inputHandler(e)} type="text" placeholder="Tag Name ie. boldred" className="w-full bg-black rounded-md text-white p-4 text-sm leading-relaxed font-mono focus:outline-none focus:none focus:ring-blue-500 resize-none font-bold"/> 
                        <div className='flex flex-col w-[10%] gap-2'>
                            <button disabled={invalid} onClick={()=>addNewFunction(functionTag, markdown)} className='bg-green-400 text-white h-1/2 rounded-md'>Add</button>
                            <button onClick={()=>setShowModal(false)} className='bg-red-400 text-white h-1/2   rounded-md'> x</button>
                        </div> 
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