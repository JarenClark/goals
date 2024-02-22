import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import ItemsTable from "@/components/ItemsTable";
import { Label } from "@/components/ui/label";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: { collectionId: string };
  children: React.ReactNode;
};

export default async function CollectionLayout({ children, params }: Props) {

  const supabase = createServerComponentClient({ cookies });

  const { data: collections } = await supabase.from("_collections").select("*");
  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .eq("collection_id", params.collectionId)
    .is("parent_item", null);

  const collection = await collections?.find(
    (x) => x.id == params.collectionId
  );
  return (
    <>
      <div className="relative">
        <div className="container pt-16 pb-8">
          <div className="inline-flex mb-4 items-center space-x-2">
            <BreadCrumbs
              linkItems={[
                // { link: "/", text: "Dashboard" },
                { link: "/collections", text: "Boards" },
                // {
                //   link: `/collections/${params.collectionId}`,
                //   text: collection.name,
                // },
              ]}
            />
            <div className="flex items-center space-x-2">
              <div className="text-muted-foreground">/</div>
              {collections && collections.length > 1 ? (
                <CollectionSelectNavigation
                  key={params.collectionId}
                  current={params.collectionId}
                  collections={collections}
                />
              ) : (
                // <Select defaultValue={params.collectionId} onValueChange={(x) => handleSelectChange(x)}>
                //   <SelectTrigger className="w-[180px]">
                //     <SelectValue placeholder="Select a fruit" />
                //   </SelectTrigger>
                //   <SelectContent>
                //     <SelectGroup>
                //       <SelectLabel>Boards</SelectLabel>
                //       {collections?.map((item, i) => (
                //         <SelectItem key={i} value={item.id}>
                //           {item.name}
                //         </SelectItem>
                //       ))}
                //     </SelectGroup>
                //   </SelectContent>
                // </Select>
                <Label>{collection.name}</Label>
              )}
            </div>
          </div>

          {!!items && items.length > 0 ? (
            <div className="">
              <ItemsTable items={items} />
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </>
  );
}
