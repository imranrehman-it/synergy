// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import {useRouter} from 'next/navigation';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

import { RiExpandRightLine } from "react-icons/ri";
import { RiExpandLeftLine } from 'react-icons/ri';

import HeadingCompiler from '../../src/utils/Headings'
import FontCompiler from '../../src/utils/FontCompiler'
import CodeSegementCompiler from '../../src/utils/CodeSegmentCompiler'
import ListCompiler from '../../src/utils/ListCompiler'
import TableCompiler from '../../src/utils/TableCompiler'
import TextColourCompiler from '../../src/utils/TextColourCompiler'

import SideBar from '../component/SideBar';



export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/hero');
    }
    console.log(session);
  }, [status, session]);

  const [markdown, setMarkdown] = useState(`
  # A demo of \`react-markdown\`

  \`react-markdown\` is a markdown component for React.

  👉 Changes are re-rendered as you type.

  👈 Try writing some markdown on the left.

  ## Overview

  * Follows [CommonMark](https://commonmark.org)
  * Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
  * Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
  * Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
  * Has a lot of plugins

  ## Contents

  Here is an example of a plugin in action
  ([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
  **This section is replaced by an actual table of contents**.

  ## Syntax highlighting

  Here is an example of a plugin to highlight code:
  [\`rehype-highlight\`](https://github.com/rehypejs/rehype-highlight).

  \`\`\`js
  import React from 'react'
  import ReactDOM from 'react-dom'
  import Markdown from 'react-markdown'
  import rehypeHighlight from 'rehype-highlight'

  const markdown = \`
  # Your markdown here
  \`

  ReactDOM.render(
    <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
    document.querySelector('#content')
  )
  \`\`\`

  Pretty neat, eh?

  ## GitHub flavored markdown (GFM)

  For GFM, you can *also* use a plugin:
  [\`remark-gfm\`](https://github.com/remarkjs/react-markdown#use).
  It adds support for GitHub-specific extensions to the language:
  tables, strikethrough, tasklists, and literal URLs.

  These features **do not work by default**.
  👆 Use the toggle above to add the plugin.

  | Feature    | Support              |
  | ---------: | :------------------- |
  | CommonMark | 100%                 |
  | GFM        | 100% w/ \`remark-gfm\` |

  ~~strikethrough~~

  * [ ] task list
  * [x] checked item

  https://example.com

  ## HTML in markdown

  ⚠️ HTML in markdown is quite unsafe, but if you want to support it, you can
  use [\`rehype-raw\`](https://github.com/rehypejs/rehype-raw).
  You should probably combine it with
  [\`rehype-sanitize\`](https://github.com/rehypejs/rehype-sanitize).

  <blockquote>
    👆 Use the toggle above to add the plugin.
  </blockquote>

  ## Components

  You can pass components to change things:

  \`\`\`js
  import React from 'react'
  import ReactDOM from 'react-dom'
  import Markdown from 'react-markdown'
  import MyFancyRule from './components/my-fancy-rule.js'

  const markdown = \`
  # Your markdown here
  \`

  ReactDOM.render(
    <Markdown
      components={{
        // Use h2s instead of h1s
        h1: 'h2',
        // Use a component instead of hrs
        hr(props) {
          const {node, ...rest} = props
          return <MyFancyRule {...rest} />
        }
      }}
    >
      {markdown}
    </Markdown>,
    document.querySelector('#content')
  )
  \`\`\`

  ## More info?

  Much more info is available in the
  [readme on GitHub](https://github.com/remarkjs/react-markdown)!

  ***

  A component by [Espen Hovlandsdal](https://espen.codes/)


`)



const compileMarkdown = (markdown: string) => {

  //content wrapped in <e>...</e> will be redered with thier respective html tags
  //eg <e><H1>test</H1></e> will be rendered as <H1>test</H1>
  markdown = markdown.replace(/<>[\s\S]*?<\/>/g, (match) => {
    // Remove the <> and </> delimiters
    return match.slice(2, -3).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  });
  
  

  
 
  markdown = CodeSegementCompiler(markdown);
  markdown = HeadingCompiler(markdown);
  markdown = FontCompiler(markdown);
  markdown = ListCompiler(markdown);
  markdown = TableCompiler(markdown);
  markdown = TextColourCompiler(markdown);



  // Replace <link>...</link> with [text](url)
  //eg <link>google,https://www.google.com</link>
  markdown = markdown.replace(/<link>([\s\S]*?)<\/link>/g, (_, content) => {
    const [text, url] = content.split(',').map(part => part.trim());
    return `[${text}](${url})`;
  });


  return markdown;
};



  return (
    <div className="w-screen h-screen flex flex-row">
      <div className='flex flex-row w-full h-full'>
      <SideBar/>
          <div className="markdown-body w-full h-full overflow-scroll flex flex-row ">
            <div className='flex flex-col w-full h-full bg-gray-800 p-2'>
              <h1 className='text-green-500'>Editor</h1>
              <textarea className="w-full h-full bg-gray-800 text-white resize-none" value={markdown} onChange={(e)=>setMarkdown(e.target.value)}></textarea>
            </div>
          </div>
          <div className="markdown-body w-full h-full overflow-scroll p-6">
          <h1 className='text-green-500'>Your First Markdown File</h1>
            <Markdown className="p-4" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>{compileMarkdown(markdown)}</Markdown>
          </div>
      </div>
      
    </div>
  );
}
