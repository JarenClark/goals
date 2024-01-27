import React from "react";
import Link from "next/link";
import { TypographyP } from "./ui/typography";
type LinkItem = {
  link?: string;
  text?: string;
};
type Props = {
  linkItems: LinkItem[];
};

export default function BreadCrumbs({ linkItems }: Props) {
  function colorClassName(index: number): string {
    if (index + 1 == linkItems.length) {
      return "text-primary";
    }
    return "text-muted-foreground hover:text-primary";
  }
  return (
    <ul className="flex items-center space-x-2 p-5 py-8">
      {linkItems
        .filter((x) => !!x.text)
        .map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <div>/</div> : null}
            <li>
              {item.link ? (
                <Link href={item.link} className={colorClassName(i)}>
                  <TypographyP>{item.text}</TypographyP>
                </Link>
              ) : (
                <span
                  className={colorClassName(i)}
                >
                  <TypographyP>{item.text}</TypographyP>
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
    </ul>
  );
}
