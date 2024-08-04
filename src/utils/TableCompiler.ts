export const TableCompiler = (markdown: string): string => {
    markdown = markdown.replace(/<table>([\s\S]*?)<\/table>/g, (_, content) => {
        let columns = [] as string[];
        let rows = [] as string[];
    
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
}

export default TableCompiler;