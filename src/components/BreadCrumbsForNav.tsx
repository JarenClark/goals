"use client";
import React, { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import CollectionSelectNavigation from "./CollectionSelectNavigation";
import { useCollectionStore, useItemStore } from "@/store";
import { Label } from "./ui/label";
type Props = {};

function BreadCrumbsForNav({}: Props) {
  const params = useParams();
  const pathname = usePathname();
  //   return null;
  // if(params.collectionId) {

  // }
  const { collections, setCollections } = useCollectionStore();
  const { item, setItem } = useItemStore();

  useEffect(() => {
    if (collections == null) {
      setCollections();
    }
    if(item == null || item.id != params.itemId) {
        setItem(params.itemId as string)
    }
  }, [collections, item, params]);
  return (
    <div className="flex items-center">
        {/* Collection navigation */}
      {!!params.collectionId && !!collections && collections.length > 0 ? (
        <React.Fragment>
          {collections.length > 1 ? (
            <CollectionSelectNavigation
              key={params.collectionId as string}
              current={params.collectionId}
            />
          ) : (
            <Label>{collections[0].name}</Label>
          )}
        </React.Fragment>
      ) : null}
      {!!params.itemId ? <Label>{item?.title}</Label>: null}
    </div>
  );
}

export default BreadCrumbsForNav;
