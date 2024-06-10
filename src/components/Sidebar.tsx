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
import { SpaceNavigator } from "@/components/SpaceNavigator";

type Props = {
  params: {
    organizationId?: string;
  };
};

export default async function Sidebar({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // const { data: spaces } = await supabase
  // .from("_organizations")
  // .select("*");

  // console.log('spaces are ', JSON.stringify(spaces,null,2))
  return (
    // <ProtectedContent>
    <div className="old-bg-black/5 old-dark:bg-white/5 bg-secondary border-r h-screen py-8 px-4  flex flex-col justify-between xl:min-w-[300px]">
     
      <section>
      <SpaceNavigator />
        <div className="flex flex-col space-y-4 mb-8 mt-16">
          <SearchInput />
        </div>

        <nav className="">
          <Menu />
        </nav>
      </section>

      <section>
        <Avi />
        <div className="flex items-center space-x-2 mt-2">
          {/* <Label> Hey, {user.email}</Label> */}
          <form action="/auth/sign-out" method="post">
            <Button variant={"outline"}>Logout</Button>
          </form>
          <ThemeToggle />
        </div>
      </section>
    </div>
    // </ProtectedContent>
  );
}
