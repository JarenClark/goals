"use server";
// import { createClient } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function deleteItem(formData: FormData) {
  "use server";
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return;
    }
    const { id, collection_id, title } = Object.fromEntries(formData);

    // Delete todo item to supabase database
    const { error } = await supabase.from("_items").delete().eq("id", id);

    const data = {
      message: `Successfully deleted ${title}!`,
      error: null,
    };

    revalidatePath(`/collections/${collection_id}`);
    return data;
  } catch (error) {
    return { error: error };
  }
}
