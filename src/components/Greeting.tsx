import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { TypographyH4 } from "./ui/typography";
import { getInitials, getFirstName } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function Greeting() {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  //const {data: profile} = await supabase.from('profiles')
  if (!user || !user.user || !user.user.id) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url, full_name")
    .eq("id", user.user.id)
    .single();

  if (!profile) return <DefaultGreeting />;
  return (
    <>
      <div className="container">
        <div className="inline-flex items-center mb-8  space-x-2">
          {profile.avatar_url ? (
            <Avatar className="w-6 h-6">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              {/* <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback> */}
            </Avatar>
          ) : null}
          <TypographyH4>Hi, {getFirstName(profile.full_name)} 👋</TypographyH4>
        </div>
      </div>
    </>
  );
}

function DefaultGreeting() {
  return (
    <>
      <div className="container">
        <div className="mb-8 p-4">
          <TypographyH4>Hi 👋</TypographyH4>
        </div>
      </div>
    </>
  );
}

