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
import { TypographyH1, TypographyMuted, TypographyP } from "@/components/ui/typography";
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
    <div className="w-full flex justify-center">
      <div className="mx-auto  flex items-center flex-col w-full px-8 justify-center py-20  gap-2">
        <div className="text-center mb-8">
          <TypographyH1 className="text-center">Goals</TypographyH1>
          <TypographyMuted className="text-center max-w-sm mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere placeat dolorem est fugiat consequatur quasi.
          </TypographyMuted>
        </div>
        <div className="">
          <Button onClick={googleSignIn}>Login with Google</Button>
        </div>
      </div>{" "}
    </div>
  );
}

// await supabase.auth.signInWithOAuth({
//   provider: 'google',
//   options: {
//     redirectTo: `/auth/callback`,
//   },
// });
