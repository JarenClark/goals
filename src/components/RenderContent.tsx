import React from "react";
import { useTheme } from "next-themes";
import { Code } from "bright";
type Props = { html: string };

function RenderContent({ html }: Props) {
  if (!html) return null;
  //   const { theme, setTheme } = useTheme();
  return (
    <div>
      {/* <pre> */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      {/* </pre> */}
    </div>
  );
}

export default RenderContent;
