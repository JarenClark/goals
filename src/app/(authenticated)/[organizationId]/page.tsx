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

    const { data: items } = await supabase
    .from("_items")
    .select("*")
    //.eq("organization_id", params.organizationId);

  return (
    <div>
      <div className="container p-8">
        <div className="mb-8">
          <TypographyH1>{org.name}</TypographyH1>
        </div>
        <TypographyH3>Your Collections</TypographyH3>
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
