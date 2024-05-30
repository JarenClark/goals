import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";

import ItemsTable from "@/components/ItemsTable";
import ContentPreview from "@/components/ContentPreview";
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
import { Button } from "@/components/ui/button";
import CollectionHeader from "@/components/collection/CollectionHeader";
import ItemCard from "@/components/item/ItemCard";

type Props = {
  params: { organizationId: string; collectionId: string; itemId?: string };
  children: React.ReactNode;
  item?: React.ReactNode;
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function CollectionLayout({
  params,
  item,
  searchParams,
  children,
}: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

  const query = searchParams?.query || "";
  const PAGE = Number(searchParams?.page) || 1;
  const ITEMS_PER_PAGE = 8;

  const { data: items, count } = await supabase
    .from("_items")
    .select("*", { count: "exact" })
    .eq("collection_id", params.collectionId)
    .order("updated_at", { ascending: false })
    .range((PAGE - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE * PAGE - 1);

  if (!collection && !items) return null;
  return (
    <>
      <div className="relative h-screen">
        <CollectionHeader id={collection.id} name={collection.name} />

        <div className="flex w-full justify-between px-4 py-2 border-b">
          <div className="flex items-center  space-x-2 text-white">
            <Label>
              {count} {count == 1 ? "Entry" : "Entries"}
            </Label>
          </div>
          <div className="flex space-x-2 items-center">
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
            <Button>New Item</Button>
          </div>
        </div>

        {!!items ? (
          <div className="px-4 py-2">
            {/* Gallery  */}
            <CardTitle className="ml-2 mt-16">Gallery</CardTitle>
            {/* <div className="mx-auto max-w-6xl"> */}
            <ul className="flex items-stretch flex-wrap -mx-1">
              {items.map((item, i) => (
                <ItemCard
                  key={i}
                  itemId={item.id}
                  collectionId={item.collection_id}
                  organizationId={params.organizationId}
                  title={item.title}
                />
              ))}
            </ul>
            {/* </div> */}
            {/* List  */}
            {/* <CardTitle className="mt-16 ml-2">List</CardTitle>

            <ul className="">
              {items.map((item, i) => (
                <li className="w-full" key={i}>
                  <div className="flex py-2 space-x-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <ItemLabelList itemId={item.id} />
                  </div>
                </li>
              ))}
            </ul> */}
            {/* Table */}
            {/* <CardTitle className="mt-16 ml-2">Table</CardTitle> */}
          </div>
        ) : null}
        {item}
      </div>

      {count && count > ITEMS_PER_PAGE ? (
        <div className="flex justify-center">
          <Link
            href={`/${params.organizationId}/${params.collectionId}?page=${
              PAGE - 1
            }`}
          >
            PREV
          </Link>
          <span>{PAGE}</span>
          <Link
            href={`/${params.organizationId}/${params.collectionId}?page=${
              PAGE + 1
            }`}
          >
            NEXT
          </Link>
        </div>
      ) : null}
      <div id="modal-root" />
    </>
  );
}
