import { TypographyH1 } from "@/components/ui/typography";
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

  return (
    <div>
      <div className="container p-8">
        <div className="mb-8">
          <TypographyH1>{org.name}</TypographyH1>
        </div>
        {JSON.stringify(org, null, 2)}
        <br />
        4e864f7c-1dad-4ed0-83a8-e9e9df8ec6df
        <ul>
          {collections ? (
            <React.Fragment>
              {collections.map((col, i) => (
                <li key={i}>
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
