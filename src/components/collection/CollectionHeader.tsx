import { BoxesIcon } from "lucide-react";
import React from "react";
import Ellipsis from "../ui/Ellipsis";
import { TypographyH3 } from "../ui/typography";

type Props = {
  id: string;
  icon?: string | React.ReactNode;
  name: string;
};

function CollectionHeader({ id, icon, name }: Props) {
  return (
    <div className="flex w-full justify-between px-4 py-4 border-b">
      <div className="flex items-center  space-x-2 text-white">
        <BoxesIcon className="w-5 h-5" />
        <TypographyH3>{name}</TypographyH3>{" "}
      </div>
      <div className="text-muted-foreground flex space-x-0">
        <Ellipsis />
      </div>
    </div>
  );
}

export default CollectionHeader;
