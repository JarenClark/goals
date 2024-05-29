import { TypedSupabaseClient } from '@/utils/types'

export function getItemsByCollection(client: TypedSupabaseClient, collectionId: string) {
  return client
    .from('_items')
    .select(
      `
      id,
      name
    `
    )
    .eq('collection_id', collectionId)
    .throwOnError()
}