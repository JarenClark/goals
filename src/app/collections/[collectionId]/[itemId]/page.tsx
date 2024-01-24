import { Card, CardContent } from "@/components/ui/card";
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
type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};

export default async function ItemPage({ params }: Props) {
  //   const { theme } = useTheme();
  const supabase = createServerComponentClient({ cookies });
  const { data: item } = await supabase
    .from("_items")
    .select("*")
    .eq("id", params.itemId)
    .single();
  return (
    <>
      {item && (
        <div className="container ">
          <div className="mb-8">
            <div className="flex  items-center space-x-2">
              <Link href={`/collections/${params.collectionId}`}>
                <ArrowLeftIcon />
              </Link>
              <TypographyH2>{item.title}</TypographyH2>
            </div>
            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
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
