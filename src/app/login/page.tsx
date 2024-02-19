"use client";
import Link from "next/link";
import Messages from "./messages";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";
export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState<boolean>(true);

  // fetch session on page load
  useEffect(() => {
    const handleLoggedInUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };
    handleLoggedInUser();
  }, [supabase, router]);

  // before our session is fetched
  if (loading)
    return (
      <div className="animate-spin w-screen h-screen flex justify-center items-center">
        <Loader2Icon />
      </div>
    );

  // oauth function
  async function googleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  }

  // login view
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <div
        className="w-full absolute inset-0 lg:relative lg:w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/login_bg.jpg)" }}
      ></div>
      <div className="bg-transparent lg:bg-muted w-full relative lg:w-1/2 h-screen flex flex-col justify-center items-center">
        <div>
          <div className="text-center mb-8 flex flex-col items-center justify-center">
            <TypographyH1 className="text-center">Archives</TypographyH1>
            {/* <TypographyMuted className="text-center max-w-sm mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
              placeat dolorem est fugiat consequatur quasi.
            </TypographyMuted> */}
          </div>
          <div className="mx-auto flex justify-center">
            <Button onClick={googleSignIn}>Login with Google</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// await supabase.auth.signInWithOAuth({
//   provider: 'google',
//   options: {
//     redirectTo: `/auth/callback`,
//   },
// });
