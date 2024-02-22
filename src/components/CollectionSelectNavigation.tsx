"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { useCollectionStore } from "@/store";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  current: any;
  collections?: any[];
};

function CollectionSelectNavigation({ current }: Props) {
  const router = useRouter();
  const params = useParams();
  function handleSelectChange(newCollectionId: string) {
    router.push(`/collections/${newCollectionId}`);
  }
  const { collections, setCollections } = useCollectionStore();
  useEffect(() => {
    if (collections == null) {
      setCollections();
    }
  }, [collections]);

  if(collections == null || collections.length == 0) {
    return null
  }

  return (
    <>

      <Select
        defaultValue={
        params?.collectionId ? params.collectionId as string  : undefined
        }
        onValueChange={(x) => handleSelectChange(x)}
      >
        <SelectTrigger className="lg:w-[180px] w-[180px] truncate">
          <SelectValue placeholder="Select a Collection" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {/* <SelectLabel>Boards</SelectLabel> */}
            {collections?.map((item, i) => (
              <SelectItem key={i} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
    </>
  );
}

export default CollectionSelectNavigation;
