export const CodeSegementCompiler = (markdown: string): string => {
  // Replace <codejs>...</codejs> with ```js...```
  markdown = markdown.replace(/<codejs>([\s\S]*?)<\/codejs>/g, '```js\n$1\n```');
  // Replace <codepython>...</codepython> with ```python...```
  markdown = markdown.replace(/<codepython>([\s\S]*?)<\/codepython>/g, '```python\n$1\n```');
  // Replace <code>...</code> with ```...```
  markdown = markdown.replace(/<code>([\s\S]*?)<\/code>/g, '```\n$1\n```');

    return markdown;
}

export default CodeSegementCompiler;
