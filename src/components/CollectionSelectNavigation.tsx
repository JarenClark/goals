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
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  current: any;
  collections: any[];
};

function CollectionSelectNavigation({ current, collections }: Props) {
  const router = useRouter();
  const params = useParams();
  function handleSelectChange(newCollectionId: string) {
    router.push(`/collections/${newCollectionId}`);
  }
  useEffect(() => {
    console.log("params:", JSON.stringify(params, null, 2));
  }, [params]);

  return (
    <Select
      defaultValue={params?.collectionId ? params.collectionId : current.collectionId }
      onValueChange={(x) => handleSelectChange(x)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Collection" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Collections</SelectLabel> */}
          {collections?.map((item, i) => (
            <SelectItem key={i} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CollectionSelectNavigation;
