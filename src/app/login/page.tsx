"use client";
import Link from "next/link";
import Messages from "./messages";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
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
  }, []);

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
    <div className="flex-1 flex items-center min-h-[80vh] flex-col w-full px-8 sm:max-w-md justify-center py-20 mx-auto gap-2">
      <Logo className="w-20 h-20 mb-8 " />
      <div className="">
        {/* <button className="rounded-md uppercase tracking-wide bg-[#12b796] hover:bg-[#0c8069] text-white px-16 py-4 flex justify-center items-center text-center">
          Login
        </button> */}
        <Button
          onClick={googleSignIn}
          className="bg-[#12b796] hover:bg-[#0c8069] text-white px-16"
        >
          Login
        </Button>
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
