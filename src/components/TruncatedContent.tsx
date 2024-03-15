import React from "react";
import truncateMarkdown from "markdown-truncate";
import markdownit from "markdown-it";
const md = markdownit();
type Props = { content: string; length?: number };

function TruncatedContent({ content, length }: Props) {
  if (!content) return null;
  const limit = length ? length : 50;
  //truncate(content, 30, { byWords: true })
  const truncated = truncateMarkdown(content, {
    limit: 50,
    ellipsis: true,
  });
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: md.render(truncated) }}
    />
  );
}

export default TruncatedContent;
