import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { Badge } from "./ui/badge";
import { paletteCycler } from "@/lib/utils";

type Props = { itemId: string };

export default async function ItemLabelList({ itemId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: item_tags }: any = await supabase
    .from("_item_labels")
    .select("id, _labels(id,name)")
    .eq("item_id", itemId);

  //const itemTags: ItemTag[] | null = item_tags ? item_tags : null
  if (!item_tags || item_tags.length == 0) return null;

  return (
    <ul className="flex flex-wrap ">
      {item_tags?.map(
        (
          tag: { id: string; _labels: { id: string; name: string } },
          i: number
        ) => (
          <React.Fragment key={i}>
            {tag._labels && tag._labels.name ? (
              <li key={i} className="mr-1 mb-1">
                <Badge className="rounded-lg p-1 text-white" style={{backgroundColor: `${paletteCycler(i)}80`}}>{tag._labels.name}</Badge>
              </li>
            ) : null}
          </React.Fragment>
        )
      )}
    </ul>
  );
}
