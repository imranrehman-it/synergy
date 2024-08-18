import React from 'react'

const MarkdownExportModal = ({markdown, setShowExportModal}: {markdown: string, setShowExportModal: (arg0:boolean)=>void}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
      <div className=' p-4 rounded-lg w-1/2 h-fit bg-gray-700'>
        <div className='flex flex-row w-full justify-between py-2 items-center'>
        <h1 className='text-xl font-bold text-white mb-2'>Compiled Markdown</h1>
        <button className='text-white bg-red-500 w-8 h-8 rounded-md' onClick={()=>setShowExportModal(false)}>x</button>
        </div>
        <textarea className='w-full bg-black h-96 text-white font-bold p-2' value={markdown} readOnly></textarea>
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => navigator.clipboard.writeText(markdown)}>Copy to clipboard</button>
      </div>
    </div>
  )
}

export default MarkdownExportModal