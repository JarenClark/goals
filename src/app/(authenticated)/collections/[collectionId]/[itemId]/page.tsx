// "use client";
import { CardTitle } from "@/components/ui/card";
import { useItemStore } from "@/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};

export default async function ItemPageNormal({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: item } = await supabase
    .from("_items")
    .select("*")
    .eq("id", params.itemId)
    .single();

    const { data: childItems } = await supabase
    .from("_items")
    .select("*")
    .eq("parent_item", params.itemId)


  return (
    <div className="container pt-16 pb-8">
      <CardTitle>{item.title}</CardTitle>
      <div className="bg-black/5 dark:bg-white/5 p-8 rounded-xl max-w-[600px] overflow-hidden">
      <code>
          <pre>{JSON.stringify(childItems, null, 2)}</pre>
        </code>
        <code>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </code>
        <code>
          /[collectionId]
          <br />
          -/[itemId]
          <br />
          -- page.tsx
          <br />
        </code>
      </div>
    </div>
  );
}
