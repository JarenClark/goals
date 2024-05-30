import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import useSupabaseServer from '@/utils/supabase-server'
import { cookies } from 'next/headers'
// import Country from '../country'
import { getItemById } from '@/queries/get-item-by-id'
import ItemHeader from '@/components/item/ItemHeader'


export default async function CountryPage({ params }: { params: { itemId: string } }) {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)

  await prefetchQuery(queryClient, getItemById(supabase, params.itemId))

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      
      {/* <Country id={params.id} /> */}
      <ItemHeader itemId={params.itemId} />

    </HydrationBoundary>
  )
}