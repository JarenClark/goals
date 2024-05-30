"use client";

import useSupabaseBrowser from "@/utils/supabase-browser";
import { getCollectionById } from "@/queries/get-collection-by-id";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

import React from "react";
import Link from "next/link";
import { BoxesIcon } from "lucide-react";

type Props = {
  collectionId: string;
};

export default function CollectionBadge({ collectionId }: Props) {
  if (!collectionId) return null;
  const supabase = useSupabaseBrowser();

  const { data: collection } = useQuery(
    getCollectionById(supabase, collectionId)
  );

  if (!collection) return null;
  return (
    <>
      <div className="mb-2 py-0.5 px-1 inline-flex items-center space-x-1 rounded-full text-xs text-purple bg-purple/20 border border-purple">
        <BoxesIcon className="w-3 h-3" />
        <span>{collection.name}</span>
      </div>
    </>
  );
}
