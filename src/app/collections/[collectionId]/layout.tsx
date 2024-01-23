import ProtectedContent from "@/components/ProtectedContent";
import { Badge } from "@/components/ui/badge";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    collectionId: string;
  };
};

export default async function CollectionPageLayout({
  children,
  params,
}: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();
  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .eq("collection_id", params.collectionId);
  return (
    <ProtectedContent>
      {collection && (
        <div className="container ">
          <div className="mb-8">
            <div className="flex  items-center space-x-2">
              <Link href={"/collections"}>
                <ArrowLeftIcon />
              </Link>
              <TypographyH2>{collection.name}</TypographyH2>
            </div>
            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>
          <div>
            <pre>{JSON.stringify(collection, null, 2)}</pre>
          </div>
          <div>
          <pre>{JSON.stringify(items, null, 2)}</pre>

          </div>
          {children}
        </div>
      )}
    </ProtectedContent>
  );
}
