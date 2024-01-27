import BreadCrumbs from "@/components/BreadCrumbs";
import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  params: {
    collectionId: string;
  };
};

export default async function CollectionPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

  const { data: collections } = await supabase.from("_collections").select("*");

  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .eq("collection_id", params.collectionId);

  return (
    <>
      {collection && (
        <div className=" ">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2">
                <BreadCrumbs
                  linkItems={[
                    { link: "/", text: "Dashboard" },
                    { link: "/collections", text: "Collections" },
                    {
                      link: `/collections/${params.collectionId}`,
                      text: collection.name,
                    },
                  ]}
                ></BreadCrumbs>
                {collections && collections.length > 1 ? (
                  <Select defaultValue={params.collectionId}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Collections</SelectLabel>
                        {collections?.map((item, i) => (
                          <SelectItem key={i} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <p>name of the collection</p>
                )}
              </div>
            </div>
            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>
          {/* <div>
            <pre>{JSON.stringify(collection, null, 2)}</pre>
          </div> */}
          <ul>
            {items?.map((item, i) => (
              <li key={i}>
                <Link href={`/collections/${params.collectionId}/${item.id}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <pre>{JSON.stringify(items, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
