import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'

type Props = {
    params: { organizationId: string;collectionId: string; itemId?: string };
    children: React.ReactNode;
    item?: React.ReactNode;
  };

export default async function CollectionPage({
    params,
    item,
    children,
  }: Props) {
    const supabase = createServerComponentClient({ cookies });
  
    const { data: collection } = await supabase
      .from("_collections")
      .select("*")
      .eq("collection_id", params.collectionId)
      .single();
  
    const { data: items } = await supabase
      .from("_items")
      .select("*")
      .eq("collection_id", params.collectionId)
      .order("updated_at", { ascending: false })
      .is("parent_item", null);
  
    
  return (
    <div>CollectionPage</div>
  )
}
