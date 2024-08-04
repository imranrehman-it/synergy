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
import { Toolbar } from '@/component/toolbar/Toolbar';
import { m } from 'framer-motion';

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



const compileMarkdown = (markdown) => {

  // Function to process <list>...</list>
  const processList = (content) => {
    let items = [];
    let buffer = '';
    let nestedLevel = 0;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];

      if (content.slice(i, i + 6) === '<list>') {
        nestedLevel++;
        buffer += char;
      } else if (content.slice(i, i + 7) === '</list>') {
        nestedLevel--;
        buffer += char;
      } else if (char === ',' && nestedLevel === 0) {
        items.push(buffer.trim());
        buffer = '';
      } else {
        buffer += char;
      }
    }

    if (buffer.trim()) {
      items.push(buffer.trim());
    }

    const markdownList = items.map(item => {
      if (item.startsWith('<list>')) {
        return processList(item.replace(/<\/?list>/g, ''));
      } else {
        return `- ${item}`;
      }
    }).join('\n');

    return markdownList.replace(/^/gm, '  ');
  };

  // Replace <codejs>...</codejs> with ```js...```
  markdown = markdown.replace(/<codejs>([\s\S]*?)<\/codejs>/g, '```js\n$1\n```');
  // Replace <codepython>...</codepython> with ```python...```
  markdown = markdown.replace(/<codepython>([\s\S]*?)<\/codepython>/g, '```python\n$1\n```');
  // Replace <code>...</code> with ```...```
  markdown = markdown.replace(/<code>([\s\S]*?)<\/code>/g, '```\n$1\n```');

  // Replace <H1>...</H1> with #...
  markdown = markdown.replace(/<H1>([\s\S]*?)<\/H1>/g, '# $1');
  // Replace <H2>...</H2> with ##...
  markdown = markdown.replace(/<H2>([\s\S]*?)<\/H2>/g, '## $1');
  // Replace <H3>...</H3> with ###...
  markdown = markdown.replace(/<H3>([\s\S]*?)<\/H3>/g, '### $1');
  // Replace <H4>...</H4> with ####...
  markdown = markdown.replace(/<H4>([\s\S]*?)<\/H4>/g, '#### $1');
  // Replace <H5>...</H5> with #####...
  markdown = markdown.replace(/<H5>([\s\S]*?)<\/H5>/g, '##### $1');
  // Replace <H6>...</H6> with ######...
  markdown = markdown.replace(/<H6>([\s\S]*?)<\/H6>/g, '###### $1');

  // Replace <bf>...</bf> with **...**
  markdown = markdown.replace(/<bf>([\s\S]*?)<\/bf>/g, (_, content) => {
    content = content.replace(/\n/g, ' ');
    return `**${content.trim()}**`;
  });

  // Replace <it>...</it> with *...*
  markdown = markdown.replace(/<it>([\s\S]*?)<\/it>/g, '*$1*');

  // Replace <hl>...</hl> with `...`
  markdown = markdown.replace(/<hl>([\s\S]*?)<\/hl>/g, '`$1`');

  // Replace <u>...</u> with underline text
  markdown = markdown.replace(/<u>([\s\S]*?)<\/u>/g, '<u>$1</u>');

  // Replace <s>...</s> with strikethrough text
  markdown = markdown.replace(/<s>([\s\S]*?)<\/s>/g, '~~$1~~');

  // Replace <list>...</list> with unordered list each item is list
  markdown = markdown.replace(/<list>([\s\S]*?)<\/list>/g, (_, content) => {
    return processList(content);
  });

  // Replace <table><columns>...</columns><row>...</row></table> with a Markdown table
  markdown = markdown.replace(/<table>([\s\S]*?)<\/table>/g, (_, content) => {
    let columns = [];
    let rows = [];

    // Extract and process each <columns> and <row>
    content.replace(/<columns>([\s\S]*?)<\/columns>/g, (_, columnsContent) => {
      columns = columnsContent.split(',').map(col => col.trim()).filter(col => col.length > 0);
    });

    content.replace(/<row>([\s\S]*?)<\/row>/g, (_, rowContent) => {
      const rowItems = rowContent.split(',').map(item => item.trim()).filter(item => item.length > 0);
      rows.push(`| ${rowItems.join(' | ')} |`);
    });

    // Create the Markdown table header
    const header = `| ${columns.join(' | ')} |`;
    const separator = `| ${columns.map(() => '---').join(' | ')} |`;

    return [header, separator, ...rows].join('\n');
  });

  return markdown;
};



  return (
    <div className="w-screen h-screen">
      <div className='flex flex-row w-full h-full'>
          <div className="markdown-body w-full h-full overflow-scroll flex flex-row gap-5">
          <Toolbar/>
            <div className='flex flex-col w-full h-full'>
              <h1 className='text-green-500 sticky'>Editor</h1>
              <textarea className="w-full h-full bg-gray-800 text-white rounded-md p-4 resize-none" value={markdown} onChange={(e)=>setMarkdown(e.target.value)}></textarea>
            </div>
          </div>
          <div className="markdown-body w-full h-full overflow-scroll p-6">
          <h1 className='text-green-500 sticky'>Your First Markdown File</h1>
            <Markdown className="p-4" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeRaw]}>{compileMarkdown(markdown)}</Markdown>
          </div>
      </div>
      
    </div>
  );
}
