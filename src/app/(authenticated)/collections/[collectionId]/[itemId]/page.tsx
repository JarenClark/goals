import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Code } from "bright";

import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import RenderContent from "@/components/RenderContent";
import BreadCrumbs from "@/components/BreadCrumbs";
type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};
type ItemType = {
  title: string;
  description: string;
  content: string;
  collection_id: string;
  _collections: { name: string };
};
export default async function ItemPage({ params }: Props) {
  //   const { theme } = useTheme();
  const supabase = createServerComponentClient({ cookies });
  const { data: item }: any = await supabase
    .from("_items")
    .select("user_id,title, description, content,collection_id, _collections(name)")
    .eq("id", params.itemId)
    .single();
  return (
    <>
      {item && (
        <div className=" px-8 py-16">
          <div className="mb-2 flex items-center justify-between">
            {/* <BreadCrumbs
              linkItems={[
                { link: "/", text: "Dashboard" },
                { link: "/collections", text: "Collections" },
                {
                  link: `/collections/${item.collection_id}`,
                  text: item._collections.name,
                },
                {
                  text: item.title,
                },
              ]}
            ></BreadCrumbs> */}
          </div>
          <div className="mb-4">
            <CardTitle>{item.title}</CardTitle>
          </div>

          <Card>
            <CardContent>
              {item.content && <RenderContent html={item.content} />}
            </CardContent>
          </Card>
          {/* <div>
            <pre>{JSON.stringify(collection, null, 2)}</pre>
          </div> */}

          <div>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        </div>
      )}
    </>
  );
}
