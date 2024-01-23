import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function AllOfMyCollections({}: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collections } = await supabase.from("_collections").select("*");

  return (
    <ProtectedContent>
      <div className="container ">
        <div className="mb-8">
          <div className="flex mb-2 items-center justify-between">
            <Link href={"/collections"}>
              <TypographyH2>All Colelctions here here</TypographyH2>
            </Link>
          </div>
          <TypographyLead>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            sit.
          </TypographyLead>
        </div>
        <Card>
          <CardContent>
            <ul>
              {collections?.map((c, i) => (
                <li key={i}>
                  <Link href={`/collections/${c.id}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </ProtectedContent>
  );
}
