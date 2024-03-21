import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  id: string;
  width?: number;
  height?: number;
};

export default async function ImageFromId({ id, width, height }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.storage
    .from("organization")
    .createSignedUrl("4e864f7c-1dad-4ed0-83a8-e9e9df8ec6df/server.jpg", 60);

  return (
    <div>
      ImageFromId
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
