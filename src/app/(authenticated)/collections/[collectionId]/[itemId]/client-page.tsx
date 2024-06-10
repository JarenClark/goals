"use client";
import { CardTitle } from "@/components/ui/card";
import { useItemStore } from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};

function ItemPageNormal({ params }: Props) {
  //const router = useRouter();
  const { item, setItem } = useItemStore();
  useEffect(() => {
    if (!item || item.id != params.itemId) {
      setItem(params.itemId);
    }
  }, [item]);
  if (!item) {
    return null;
  }
  return (
    <div className="container pt-16 pb-8">
      <CardTitle>{item.title}</CardTitle>
      <div className="old-bg-black/5 old-dark:bg-white/5 bg-secondary p-8 rounded-xl max-w-[600px] overflow-hidden">
       <code>
        <pre>{JSON.stringify(item,null,2)}</pre>
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

export default ItemPageNormal;
