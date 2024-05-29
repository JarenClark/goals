import ItemHeader from "@/components/item/ItemHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: {
    organizationId: string;
    collectionId: string;
    itemId: string;
  };
};

export default async function ItemPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: item } = await supabase
    .from("_items")
    .select("*")
    .eq("id", params.itemId)
    .single();

  const { data: col } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

    if(!item) return null
  return (
    <>
      <ItemHeader
        spaceId={params.organizationId}
        collectionName={col?.name ?? ''}
        collectionId={params.collectionId}
        key={params.itemId}
        id={params.itemId}
        title={item.title}
      />
      <div>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </div>
    </>
  );
}
