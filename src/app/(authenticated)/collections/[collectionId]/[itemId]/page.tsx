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
  const router = useRouter();
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
      <div className="bg-black/5 dark:bg-white/5 p-8 rounded-xl">
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
