import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// type Props = {};
import {
  HomeIcon,
  PlusCircleIcon,
  FilesIcon,
  Building2Icon,
  BarChart2Icon,
  UsersIcon,
  GoalIcon,
  ListChecks,
  MenuIcon,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackButton from "./BackButton";
import NavDrawer from "./NavDrawer";
import MenuToggle from "./MenuToggle";
import { getInitials } from "@/lib/utils";
import SearchInput from "./SearchInput";
export default async function Header() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: picture } = await supabase.from("profiles").select("avatr_url");

  return (
    <>
      <NavDrawer />
      <header className="border-b">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between py-4">
            <div className="inline-flex space-x-2 items-center">
              {/* {user && user.user_metadata && user.user_metadata.avatar_url && (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.user_metadata.picture}
                      alt={user.user_metadata.full_name}
                    />
                    <AvatarFallback>
                      {getInitials(user.user_metadata.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </>
              )} */}
              {user ? <MenuToggle /> : <div />}
            </div>

            <div className="flex items-center space-x-2">
              {user ? <SearchInput /> : <div />}
            </div>

            <div className="inline-flex items-center space-x-2">
              <div>
                {user ? (
                  <div className="flex items-center space-x-2">
                    {/* <Label> Hey, {user.email}</Label> */}
                    <form action="/auth/sign-out" method="post">
                      <Button variant={"outline"}>Logout</Button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <Link href={"/login"}>
                      <Button variant={"outline"}>Sign In</Button>
                    </Link>
                  </div>
                )}
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
