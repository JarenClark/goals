import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { Badge } from "./ui/badge";

type Props = { itemId: string };

export default async function ItemLabelList({ itemId }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: tags } = await supabase
    .from("_item_labels")
    .select("id, _labels(id,name)")
    .eq("item_id", itemId);

  // return (
  //     <p>{JSON.stringify(tags)}</p>
  // )
  return (
    <ul className="flex flex-wrap">
      {tags?.map((tag, i) => (
        <React.Fragment key={i}>
          {tag._labels && tag._labels.name ? (
            <li key={i} className="mr-1 mb-1">
              <Badge>{tag._labels.name as String}</Badge>
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  );
}
