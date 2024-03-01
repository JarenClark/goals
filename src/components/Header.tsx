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
import { LayoutGrid } from "lucide-react";

import BreadCrumbsForNav from "./BreadCrumbsForNav";
import ItemTitleById from "./ItemTitleById";
type Props = {
  children?: React.ReactNode;
  params?: {
    collectionId?: string;
    itemId?: string;
    labelId?: string;
  };
};
export default async function Header({ children, params }: Props) {
  return (
    <>
      <NavDrawer />
      <header className="border-b px-4 min-h-[80px] flex w-full items-center">
        <nav className="flex w-screen items-center justify-between py-4">
          <div className="inline-flex space-x-2 items-center">
            <div className="bg-gradient-to-br from-pink-500 to-indigo-600 p-1 rounded-md text-white">
              <LayoutGrid className="w-4 h-4" />
            </div>
            <BreadCrumbsForNav key={params?.collectionId} />
            {/* <pre>{JSON.stringify(params, null, 2)}</pre> */}
            <ItemTitleById id={params?.itemId}/>
            <pre>{JSON.stringify(params,null,2)}</pre>
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
          </div>

          <div className="inline-flex items-center space-x-2">
            <MenuToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
