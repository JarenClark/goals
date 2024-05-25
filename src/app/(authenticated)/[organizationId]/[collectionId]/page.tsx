import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import Header from "@/components/Header";
import ItemsTable from "@/components/ItemsTable";
import TruncatedContent from "@/components/TruncatedContent";
import { Label } from "@/components/ui/label";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import ActivePathOverlay from "@/components/ActivePathOverlay";
import {
  BoxesIcon,
  CircleEllipsisIcon,
  DotIcon,
  GalleryHorizontal,
  GalleryThumbnails,
  Grid2X2Icon,
  ListIcon,
  Table2Icon,
} from "lucide-react";
import Ellipsis from "@/components/ui/Ellipsis";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import ItemLabelList from "@/components/ItemLabelList";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  params: { collectionId: string; itemId?: string };
  children: React.ReactNode;
  item?: React.ReactNode;
};

export default async function CollectionLayout({
  params,
  item,
  children,
}: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

  const { data: items, count } = await supabase
    .from("_items")
    .select("*", { count: "exact" })
    .eq("collection_id", params.collectionId)
    .order("updated_at", { ascending: false })
    .is("parent_item", null);

  return (
    <>
      <div className="relative h-screen">
        <div className="flex w-full justify-between px-4 py-4 border-b">
          <div className="flex items-center  space-x-2 text-white">
            <BoxesIcon className="w-5 h-5" />
            <TypographyH3>{collection.name}</TypographyH3>{" "}
          </div>
          <div className="text-muted-foreground flex space-x-0">
            <Ellipsis />
          </div>
        </div>

        <div className="flex w-full justify-between px-4 py-2 border-b">
          <div className="flex items-center  space-x-2 text-white">
            <Label>
              {count} {count == 1 ? "Entry" : "Entries"}
            </Label>
          </div>
          <ul className="text-muted-foreground flex space-x-1">
            <li>
              <ListIcon />
            </li>
            <li>
              <Grid2X2Icon />
            </li>
            <li>
              <Table2Icon />
            </li>
          </ul>
        </div>

        {!!items ? (
          <div className="px-4 py-2">
            {/* Gallery  */}
            <ul className="flex items-stretch flex-wrap -mx-1">
              {items.map((item, i) => (
                <li
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-1 min-h-[300px]"
                  key={i}
                >
                  <Card className="min-h-[300px]">
                    <CardHeader>
                    <time className="text-foreground text-[0.75rem]">
                              {format(
                                new Date(item.updated_at), "MM/dd/yyyy"
                              )}
                            </time>
                      {/* <div>
                        <div className="mb-2 px-1 inline-flex rounded-full text-xs bg-purple/50 border border-purple">
                          {collection.name}
                        </div>
                      </div> */}
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter>
                      <ItemLabelList itemId={item.id} />
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
            {/* List  */}
            <ul className="-mx-3">
              {items.map((item, i) => (
                <li className="w-full p-2" key={i}>
                  <div className="flex rounded-lg border p-4">
                    <Label>{item.title}</Label>
                    <ItemLabelList itemId={item.id} />
                  </div>
                </li>
              ))}
            </ul>
            {/* Table */}
          </div>
        ) : null}
        {item}
      </div>
      <div id="modal-root" />
    </>
  );
}
