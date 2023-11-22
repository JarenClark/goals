import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

export default async function ProtectedContent({ children }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
// console.log(`session:`, session)
  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
