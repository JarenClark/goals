import { paginationRange } from "@/utils/pagination-range";
import { TypedSupabaseClient } from "@/utils/types";

export function getItemsByCollection(
  client: TypedSupabaseClient,
  collectionId: string,
  page?: number
) {
  const [from, to] = paginationRange(null, page);

  return client
    .from("_items")
    .select(`*`)
    .eq("collection_id", collectionId)
    .range(from, to)
    .throwOnError();
}
