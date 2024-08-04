export const HeadingComplier = (markdown: string): string =>
{
    
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

    return markdown;

}

export default HeadingComplier;