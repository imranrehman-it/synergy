import React from 'react'

const FunctionIcon = ({value, template, setMarkdown}: {value: string, template: string, setMarkdown : (arg0: string) => string}) => {

    const insertTemplate = () => {
        setMarkdown(prev => prev + `\n${template}`);
    }

  return (   
    <div onClick={insertTemplate} className='min-w-12 h-12 rounded-sm bg-gray-700 flex items-center cursor-pointer px-1 hover:bg-gray-600'>
    <p className='text-xs text-white font-bold w-full text-center '>{value}</p>
  </div>
  )
}

export default FunctionIcon

