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
  TagIcon,
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
import BackButton from "./BackButton";
import Menu from "./Menu";
import Greeting from "./Greeting";
import Avi from "./Avi";
import SearchInput from "./SearchInput";
import ProtectedContent from "./ProtectedContent";
import { useMediaQuery } from "@/hooks/use-media-query";

export default async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return (
    // <ProtectedContent>
      <div className="bg-black/5 dark:bg-white/5 border-r h-screen py-8 px-4  flex flex-col justify-between xl:min-w-[300px] pr-8">
        <section>
          <div className="flex flex-col space-y-4 mb-8 mt-16">


            <SearchInput />
          </div>
          <nav className="">
            <Menu />
          </nav>
        </section>
        <div>
        <Avi />
          <div className="flex items-center space-x-2 mt-2">
            {/* <Label> Hey, {user.email}</Label> */}
            <form action="/auth/sign-out" method="post">
              <Button variant={"outline"}>Logout</Button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </div>
    // </ProtectedContent>
  );
}
