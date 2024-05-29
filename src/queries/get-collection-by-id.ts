import { TypedSupabaseClient } from '@/utils/types'

export function getCollectionById(client: TypedSupabaseClient, collectionId: string) {
  return client
    .from('_collections')
    .select(
      `
      id,
      name,
      organization_id
    `
    )
    .eq('id', collectionId)
    .throwOnError()
    .single()
}