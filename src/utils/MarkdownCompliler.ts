
import HeadingCompiler from '../../src/utils/Headings';
import FontCompiler from '../../src/utils/FontCompiler';
import CodeSegementCompiler from '../../src/utils/CodeSegmentCompiler';
import ListCompiler from '../../src/utils/ListCompiler';
import TableCompiler from '../../src/utils/TableCompiler';
import TextColourCompiler from '../../src/utils/TextColourCompiler';

let customFunctions = { 
    'br': '<bf><red>{content}</red></bf>',
    'name': '<bf>Imran</bf>'
};


const compileMarkdown = (markdown: string) => {
    
    Object.keys(customFunctions).forEach((tag) => {
        markdown = markdown.replace(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'), (_, content) => {
            return customFunctions[tag].replace('{content}', content);
        });
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

const addFunction = (tag: string, template: string) =>{
    console.log(tag, template);
    customFunctions[tag] = template;
    console.log(customFunctions);
}

export {
    compileMarkdown,
    addFunction
};