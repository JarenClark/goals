import { BoxesIcon } from "lucide-react";
import React from "react";
import Ellipsis from "../ui/Ellipsis";
import { TypographyH3 } from "../ui/typography";
import Link from "next/link";

type Props = {
  id: string;
  icon?: string | React.ReactNode;
  title: string;
  spaceId?:string;
  collectionName?: string;
  collectionId?: string;
};

function ItemHeader({ id, spaceId, collectionName, collectionId, title }: Props) {
  return (
    <div className="flex w-full justify-between px-4 py-4 border-b">
      <div className="flex items-center  space-x-2 text-white">
        
        {spaceId && collectionName && collectionId ? (
          <div className="flex items-center space-x-2">
            <BoxesIcon className="w-5 h-5" />
            <Link href={`/${spaceId}/${collectionId}`}>
            <TypographyH3>{collectionName}</TypographyH3>{" "}

            </Link>
            <TypographyH3>/</TypographyH3>
          </div>
        ) : null}
        <TypographyH3>{title}</TypographyH3>{" "}
      </div>
      <div className="text-muted-foreground flex space-x-0">
        <Ellipsis />
      </div>
    </div>
  );
}

export default ItemHeader;
