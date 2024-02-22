"use client";
import React, { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import CollectionSelectNavigation from "./CollectionSelectNavigation";
import { useCollectionStore } from "@/store";
type Props = {};

function BreadCrumbsForNav({}: Props) {
  const params = useParams();
  const pathname = usePathname();
  //   return null;
  // if(params.collectionId) {

  // }
  const { collections, setCollections } = useCollectionStore();
  useEffect(() => {
    if (collections == null) {
      setCollections();
    }
  }, [collections]);
  return (
    <div className="flex items-center">
      {!!params.collectionId && !!collections && collections.length ? (
        <CollectionSelectNavigation
          key={params.collectionId as string}
          current={params.collectionId}
        />
      ) : null}
    </div>
  );
}

export default BreadCrumbsForNav;
