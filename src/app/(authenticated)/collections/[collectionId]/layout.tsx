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
  item?: React.ReactNode;
};

export default async function CollectionLayout(props: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collections } = await supabase.from("_collections").select("*");
  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .eq("collection_id", props.params.collectionId)
    .is("parent_item", null);

  const collection = await collections?.find(
    (x) => x.id == props.params.collectionId
  );
  return (
    <>
      <div className="relative h-screen">
        <div className="flex h-full">
            <div className="w-full lg:w-1/3 border-r h-full">
            <div className="container pt-16 pb-8">
          {!!items && items.length > 0 ? (
            <div className="">
              <ItemsTable items={items} />
            </div>
          ) : null}
        </div>
            </div>
            <div className="w-full lg:w-2/3 h-full ">
                {props.children}
            </div>
        </div>
        {props.item}
      </div>
      <div id="modal-root" />
    </>
  );
}
