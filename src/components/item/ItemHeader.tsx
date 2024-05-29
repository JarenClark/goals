"use client";

import useSupabaseBrowser from "@/utils/supabase-browser";
import useSupabaseServer from "@/utils/supabase-server";

import { getItemById } from "@/queries/get-item-by-id";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

import { BoxesIcon } from "lucide-react";
import React from "react";
import Ellipsis from "../ui/Ellipsis";
import { TypographyH3 } from "../ui/typography";
import Link from "next/link";
import CollectionLink from "../collection/CollectionLink";

type Props = {
  itemId: string;
  collectionId?: string;
};

export default function ItemHeader({ itemId }: Props) {
  const supabase = useSupabaseBrowser();
  const { data: item } = useQuery(getItemById(supabase, itemId));

  return (
    <div className="flex w-full justify-between px-4 py-4 border-b">
      <div className="flex items-center  space-x-2 text-white">
        <div className="flex items-center space-x-2">
          <BoxesIcon className="w-5 h-5" />
          {item && item.collection_id ? (
            <TypographyH3>
              <CollectionLink collectionId={item?.collection_id} />
            </TypographyH3>
          ) : null}
          <TypographyH3>/</TypographyH3>
        </div>
        <TypographyH3>{item?.title}</TypographyH3>{" "}
      </div>
      <div className="text-muted-foreground flex space-x-0">
        <Ellipsis />
      </div>
    </div>
  );
}
