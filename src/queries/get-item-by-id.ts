import { TypedSupabaseClient } from '@/utils/types'

export function getItemById(client: TypedSupabaseClient, itemId: string) {
  return client
    .from('_items')
    .select(
      `
      id,
      title,
      collection_id
    `
    )
    .eq('id', itemId)
    .throwOnError()
    .single()
}