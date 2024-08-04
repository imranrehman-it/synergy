// app/page.tsx
'use client';
import { useState } from 'react';
import { Link } from '@chakra-ui/next-js';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import Navbar from '../component/main/Navbar';
import { Text } from '@chakra-ui/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

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



  return (
    <div className="w-screen h-screen">
      {/* <div className="flex flex-row w-full h-full gap-2 p-4">
        <div className="w-[20%] h-full rounded-lg bg-slate-100 shadow-inner flex-col p-4">
          <h1 className="text-2xl font-bold">Sidebar</h1>
          <div className="flex-grow bg-gray-300 h-[1px] mt-2" /> 
        </div>

        <div className="w-[80%] h-full rounded-lg bg-slate-100 shadow-inner p-4">
          <h1 className="text-2xl font-bold">Content</h1>
          <div className="flex-grow bg-gray-300 h-[1px] mt-2" />

          <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='flex flex-row w-[90%] h-[90%] bg-green-50 rounded-lg'>
              <div className="markdown-body w-full h-full rounded-lg p-4 overflow-scroll">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>{markdown}</Markdown>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className='flex flex-row w-full h-full'>
          <div className="markdown-body w-full h-full  p-4 overflow-scroll">
            <textarea className="w-full h-full p-4 bg-gray-800 text-white" value={markdown} onChange={(e)=>setMarkdown(e.target.value)}></textarea>
          </div>
          <div className="markdown-body w-full h-full  p-4 overflow-scroll">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>{markdown}</Markdown>
          </div>
      </div>
      
    </div>
  );
}
