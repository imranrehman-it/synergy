export const ListCompiler = (markdown: string): string => {

    const processList = (content: string): string => {
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

      // Replace <list>...</list> with unordered list each item is list
        markdown = markdown.replace(/<list>([\s\S]*?)<\/list>/g, (_, content) => {
            return processList(content);
        });
    


    return markdown;
}

export default ListCompiler;