
import HeadingCompiler from '../../src/utils/Headings';
import FontCompiler from '../../src/utils/FontCompiler';
import CodeSegementCompiler from '../../src/utils/CodeSegmentCompiler';
import ListCompiler from '../../src/utils/ListCompiler';
import TableCompiler from '../../src/utils/TableCompiler';
import TextColourCompiler from '../../src/utils/TextColourCompiler';

export const compileMarkdown = (markdown: string) => {
    markdown = markdown.replace(/<>[\s\S]*?<\/>/g, (match) => {
      return match.slice(2, -3).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });

    markdown = CodeSegementCompiler(markdown);
    markdown = HeadingCompiler(markdown);
    markdown = FontCompiler(markdown);
    markdown = ListCompiler(markdown);
    markdown = TableCompiler(markdown);
    markdown = TextColourCompiler(markdown);

    markdown = markdown.replace(/<link>([\s\S]*?)<\/link>/g, (_, content) => {
      const [text, url] = content.split(',').map((part: string) => part.trim());
      return `[${text}](${url})`;
    });

    console.log(markdown);

    return markdown;
  };