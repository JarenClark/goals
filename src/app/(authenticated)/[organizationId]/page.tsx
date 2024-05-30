import ItemCard from "@/components/item/ItemCard";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    organizationId: string;
  };
};

export default async function OrganizationHomepage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: org } = await supabase
    .from("_organizations")
    .select("*")
    .eq("id", params.organizationId)
    .single();

  const { data: collections } = await supabase
    .from("_collections")
    .select("*")
    .eq("organization_id", params.organizationId);

  const colIds =
    (await collections?.map((col) => {
      return col.id;
    })) ?? [];
  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .order("updated_at", { ascending: false })
    .in("collection_id", colIds)
    .range(0, 3);

  return (
    <div>
      <div className="container p-8">
        <div className="mb-8">
          <TypographyH1>{org.name}</TypographyH1>
        </div>

        <div className="container mx-auto max-w-5xl">
          <TypographyH3>Recent Items</TypographyH3>
          <ul className="flex flex-wrap -mx-4">
            {items?.map((item, i) => (
              <ItemCard
              key={i}
                itemId={item.id}
                collectionId={item.collection_id}
                organizationId={params.organizationId}
                title={item.title}
              />
            ))}
          </ul>
          <div className="h-20"></div>
          <TypographyH3>All Collections</TypographyH3>
          <ul className="">
            {collections ? (
              <React.Fragment>
                {collections.map((col, i) => (
                  <li
                    key={i}
                    className="group overflow-hidden border-b-2 border-white dark:border-black last:border-none first:rounded-t-xl last:rounded-b-xl"
                  >
                    <Link href={`/${params.organizationId}/${col.id}`}>
                      <div className="flex justify-between bg-black/5 px-4 py-4 dark:bg-white/5 ">
                        <span className="translate-x-0 group-hover:translate-x-2 transition duration-300">
                          {col.name}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
