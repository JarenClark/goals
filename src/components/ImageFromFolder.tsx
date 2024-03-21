import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  folder: string;
  name: string;
  width?: number;
  height?: number;
};

export default async function ImageFromFolder({ folder, name, width, height }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.storage
    .from("organization")
    .createSignedUrl(`${folder}/${name}`, 60);

  
  return (
    <>
      <img src={data?.signedUrl} />
    </>
  );
}
