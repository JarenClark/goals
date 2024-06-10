import { BoxesIcon } from "lucide-react";
import React from "react";
import CollectionLink from "@/components/collection/CollectionLink";
import Ellipsis from "@/components/ui/Ellipsis";
import { TypographyH3 } from "@/components/ui/typography";

type CrumbType = "Org" | "Col" | "Item" | "Label" | "Query"; // will sort in this order
type BreadCrumb = {
  id: string;
  title: string;
  param: CrumbType;
};

type Props = {
  breadCrumbs?: BreadCrumb[];
};
const sortKey = {
  Org: 0,
  Col: 1,
  Item: 2,
  Label: 3,
  Query: 4,
};
function Header({ breadCrumbs }: Props) {
  if (!breadCrumbs || breadCrumbs.length == 0) return null;
  const sortedBc = breadCrumbs.sort((a, b) =>
    sortKey[a.param] < sortKey[b.param] ? -1 : 1
  );


  return (
    <React.Fragment>
      <div className="h-20"></div>
      <div className="sticky z-10 h-20 w-screen top-0 left-0 bg-red-500">
        <div className="flex  w-full justify-between px-4 py-4 border-b">
          <div className="flex items-center  space-x-2 text-white">
            {sortedBc?.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && <TypographyH3>/</TypographyH3>}
                <TypographyH3>{item.title}</TypographyH3>
              </React.Fragment>
            ))}
          </div>
          <div className="text-muted-foreground flex space-x-0">
            <Ellipsis />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
