export const FontCompiler = (markdown: string): string =>{
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

  return markdown;
}

export default FontCompiler;
