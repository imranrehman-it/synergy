export const TextColourCompiler = (markdown: string): string => {
    markdown = markdown.replace(/<red>([\s\S]*?)<\/red>/g, '<span style="color:red">$1</span>');
    markdown = markdown.replace(/<blue>([\s\S]*?)<\/blue>/g, '<span style="color:blue">$1</span>');
    markdown = markdown.replace(/<green>([\s\S]*?)<\/green>/g, '<span style="color:green">$1</span>');
    markdown = markdown.replace(/<yellow>([\s\S]*?)<\/yellow>/g, '<span style="color:yellow">$1</span>');
    markdown = markdown.replace(/<orange>([\s\S]*?)<\/orange>/g, '<span style="color:orange">$1</span>');
    markdown = markdown.replace(/<purple>([\s\S]*?)<\/purple>/g, '<span style="color:purple">$1</span>');
    markdown = markdown.replace(/<pink>([\s\S]*?)<\/pink>/g, '<span style="color:pink">$1</span>');
    markdown = markdown.replace(/<brown>([\s\S]*?)<\/brown>/g, '<span style="color:brown">$1</span>');
    markdown = markdown.replace(/<black>([\s\S]*?)<\/black>/g, '<span style="color:black">$1</span>');
    markdown = markdown.replace(/<white>([\s\S]*?)<\/white>/g, '<span style="color:white">$1</span>');
    return markdown;

}

export default TextColourCompiler;