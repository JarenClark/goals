"use client";

import useSupabaseBrowser from "@/utils/supabase-browser";
import { getCollectionById } from "@/queries/get-collection-by-id";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";

import React from "react";
import Link from "next/link";

type Props = {
  collectionId: string;
};

export default function CollectionLink({ collectionId }: Props) {
    if(!collectionId) return null
  const supabase = useSupabaseBrowser();

  const { data: collection } = useQuery(
    getCollectionById(supabase, collectionId)
  );

  if (!collection) return null;
  return (
    <Link href={`/${collection.organization_id}/${collectionId}`}>
      {collection.name}
    </Link>
  );
}
