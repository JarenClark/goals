import React from "react";
import truncateMarkdown from "markdown-truncate";
import markdownit from "markdown-it";
const md = markdownit();
type Props = { content: string; length?: number };


export default function ContentPreview({ content, length }: Props) {
    if (!content) return null;
    const limit = length ? length : 100;
    //truncate(content, 30, { byWords: true })
    const truncated = truncateMarkdown(content, {
      limit: limit,
      ellipsis: true,
    });

    let html = md.render(truncated)
    // remove pre tags
    if(html.indexOf('<pre>') == 0) {
        html = html.slice(5, html.length - 7)
    }
    return (
      <div className="text-muted-foreground text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  