import React from 'react'
import { useState } from 'react';

import { RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FiSave } from 'react-icons/fi';

import FunctionIcon from './FunctionIcon';
import CreateFunctionModal from './CreateFunctionModal';
import { addFunction } from '@/utils/MarkdownCompliler';

const CustomFunctions = ({setMarkdown} : {setMarkdown: (arg0: string) => void}) => {
    const [showModal, setShowModal] = useState(false);

    const [functionList, setFunctionList] = useState(
        [
            {value: '<H1/>', template: '<H1>Heading 1</H1>'},
            {value: '<H2/>', template: '<H2>Heading 2</H2>'},
            {value: '<H3/>', template: '<H3>Heading 3</H3>'},
            {value: '<H4/>', template: '<H4>Heading 4</H4>'},
            {value: '<H5/>', template: '<H5>Heading 5</H5>'},
            {value: '<H6/>', template: '<H6>Heading 6</H6>'},
            {value: '<bf/>', template: '<bf>Bold</bf>'},
            {value: '<it/>', template: '<it>Italic</it>'},
            {value: '<u/>', template: '<u>Unerline</u>'},
            {value : '<hl/>', template: '<hl>Highlight</hl>'},
            {value: '<s/>', template: '<s>Strike</s>'},
            {value: '<codejs/>', template: '<codejs>Code JS</codejs>'},
            {value: '<codepython/>', template: '<codepython>Code Python</codepython>'},
            {value: '<red/>', template: '<red>Red</red>'},
            {value: '<green/>', template: '<green>Green</green>'},
            {value: '<blue/>', template: '<blue>Blue</blue>'},
            {value: '<yellow/>', template: '<yellow>Yellow</yellow>'},
            {value: '<purple/>', template: '<purple>Purple</purple>'},
            {value: '<list/>', template: '<list>item1, item2, item3</list>'},
            {value: '<table/>', template: '\n<table>\n<columns>Col1, Col2, Col3,</columns>\n<row>item1, item2, item3</row>\n<row>item4, item5, item6</row>\n<row>item7, item8, item9</row>\n</table>'},
        ]
    );

    const addNewFunction = (value: string, template: string) => {
        console.log('value', value, template);
        const tag = `<${value}/>`;
        addFunction(value, template);
        setFunctionList(prev => [...prev, {value: tag, template: template}]);
        setShowModal(false);
    }
    

  return (
    <div className="flex flex-col h-[30%] w-full bg-gray-800 p-2">
    {showModal && <CreateFunctionModal addNewFunction={addNewFunction} setShowModal={setShowModal} />}
    <div className='flex flex-row bg-gray-700 h-10 rounded-t-lg items-center p-2 w-full'>
        <div className='absolute flex flex-row gap-2'>
          <RiExpandLeftLine className='text-white text-md cursor-pointer bg-red-400 rounded-lg'/>
          <RiExpandRightLine className='text-white text-md cursor-pointer bg-blue-400 rounded-lg'/>
          <FiSave className='text-white text-md cursor-pointer bg-green-400 rounded-lg'/>
        </div>
         <p className='text-white font-bold w-full text-center'>Custom Function</p>
        </div>
        <div className="w-full h-full bg-black">
            <div className="flex flex-wrap p-2 gap-2 mb-2 rounded">
            {functionList.map((func) => (
                <FunctionIcon key={func.value} value={func.value} template={func.template} setMarkdown={setMarkdown}/>
            ))}
             <div  onClick={()=>setShowModal(true)}className='min-w-12 h-12 rounded-sm bg-green-700 flex items-center cursor-pointer px-1'>
                <p className='text-xs text-white font-bold w-full text-center '>➕</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default CustomFunctions