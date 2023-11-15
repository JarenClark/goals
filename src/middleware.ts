import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from '@/lib/database.types'

export async function middleware(req: NextRequest) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const res = NextResponse.next({
    request: {
        // Apply new request headers
        headers: requestHeaders,
      }
  });
  //const supabase = createMiddlewareClient<Database>({ req, res })
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  //   console.log('middleware')
  return res;
}
