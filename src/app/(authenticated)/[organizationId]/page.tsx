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
    .in("collection_id", colIds);

  return (
    <div>
      <div className="container p-8">
        <div className="mb-8">
          <TypographyH1>{org.name}</TypographyH1>
        </div>
        <TypographyH3>Recent Items</TypographyH3>
        <ul className="flex flex-wrap -mx-4">
          {items?.map((item, i) => (
            <li key={i} className="w-1/2 md:w-1/3 lg:w-1/4  px-4 mb-8">
              <Link
                className="flex rounded-2xl dark:bg-white/10 bg-black/10 p-4"
                href={`/${params.organizationId}/${item.collection_id}/${item.id}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="h-20"></div>
        <TypographyH3>All Collections</TypographyH3>
        <ul className="list-disc pl-4">
          {collections ? (
            <React.Fragment>
              {collections.map((col, i) => (
                <li key={i} className="text-white hover:text-indigo">
                  <Link href={`/${params.organizationId}/${col.id}`}>
                    {col.name}
                  </Link>
                </li>
              ))}
            </React.Fragment>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
