import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { TypographyMuted, TypographyP } from "./ui/typography";
import { getInitials, getFirstName } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default async function Avi() {
  const supabase = createServerComponentClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  //const {data: profile} = await supabase.from('profiles')
  if (!user || !user.user || !user.user.id) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("avatar_url, full_name, created_at")
    .eq("id", user.user.id)
    .single();

  if (!profile) return null;

  const datedate = new Date();
  datedate.setDate(datedate.getDate() - 1);
  return (
    <>
      <div className="inline-flex items-center   space-x-2">
        {profile.avatar_url ? (
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
            {/* <AvatarFallback>{getInitials(profile.full_name)}</AvatarFallback> */}
          </Avatar>
        ) : null}
        <div>
          <TypographyP>{profile.full_name}</TypographyP>
          {user.user && user.user.email ? (
            <TypographyMuted>{user.user.email}</TypographyMuted>
          ) : null}
        </div>

        {/* */}
      </div>
    </>
  );
}
