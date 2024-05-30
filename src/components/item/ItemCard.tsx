import { BoxesIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import ContentPreview from "../ContentPreview";
import ItemLabelList from "../ItemLabelList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import CollectionBadge from "../collection/CollectionBadge";

type Props = {
  itemId: string;
  title: string;
  content?: string;
  collectionId: string;
  organizationId: string;
};

function ItemCard({
  itemId,
  title,
  content,
  organizationId,
  collectionId,
}: Props) {
  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-1 min-h-[300px]">
      <Link
        className="group"
        href={`/${organizationId}/${collectionId}/${itemId}`}
      >
        <Card className="min-h-[300px] flex flex-col justify-between">
          <div>
            <CardHeader>
              <div>
                <CollectionBadge collectionId={collectionId} />
              </div>
              <CardTitle className="text-lg opacity-60 group-hover:opacity-100">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {content ? (
                <ContentPreview content={content} length={75} />
              ) : null}
            </CardContent>
          </div>

          <CardFooter>
            <ItemLabelList itemId={itemId} />
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}

export default ItemCard;
