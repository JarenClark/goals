"use server";
// import { createClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache';

export default async function insertItem(formData: FormData) {
  "use server";
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }
    const { title, collection_id } = Object.fromEntries(formData);
    // formData.get("item");
    //   if (!item) {
    //     return;
    //   }
    // Save todo item to supabase database
    const { data, error } = await supabase.from("_items").insert({
      title: title,
      collection_id: collection_id,
      user_id: user.id,
      created_at: new Date().toISOString(),
    })
    .select().single();

    console.log("DATA:", data);
    revalidatePath(`/collections/${collection_id}`)
    return { data };
  } catch (error) {
    return { error: error };
  }
}
