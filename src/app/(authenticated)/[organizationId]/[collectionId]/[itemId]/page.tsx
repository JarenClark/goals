import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {
    params: {
        itemId:string;
    }
}

export default async function ItemPage({params}: Props) {
    const supabase = createServerComponentClient({ cookies });
    const { data: item } = await supabase
    .from("_items")
    .select("*")
    .eq("id", params.itemId)
    .single();
  return (
    <div>
        <pre>{JSON.stringify(item,null,2)}</pre>
    </div>
  )
}
