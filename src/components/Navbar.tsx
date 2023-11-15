import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// type Props = {};
import { HomeIcon, PlusCircleIcon } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "./ThemeToggle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
//import LogoutButton from "@/components/LogoutButton";
async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="border-b-2">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4">
          <div>
            <Link href={"/"}>
              <div className="flex items-center space-x-1">
                <Logo className="w-6 h-6" />
                <p>Home</p>
              </div>
            </Link>
          </div>
          <div className="inline-flex items-center space-x-2">
            <div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Label> Hey, {user.email}</Label>
                  <form action="/auth/sign-out" method="post">
                    <Button>Logout</Button>
                  </form>
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <Button>Sign In</Button>
                  </Link>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
