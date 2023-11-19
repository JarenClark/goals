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
} from "lucide-react";
import Logo from "@/components/svg/Logo_SOW";
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
async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navIcons = [
    {
      link: "/documents",
      icon: <FilesIcon />,
      tooltip: "Documents",
    },
    {
      link: "/companies",
      icon: <Building2Icon />,
      tooltip: "Companies",
    },
    {
      link: "/users",
      icon: <UsersIcon />,
      tooltip: "Users",
    },
    {
      link: "/reports",
      icon: <BarChart2Icon />,
      tooltip: "Reports",
    },
  ];
  return (
    <header className="border-b-2">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-4">
        {user ? (
          <div className="inline-flex h-full items-center space-x-4">
            <>
              <BackButton />
            </>
            {navIcons.map((item, i) => (
              <React.Fragment key={i}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={item.link}>{item.icon}</Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </React.Fragment>
            ))}
          </div>
        ): <div/>}

          {/* <div className="flex items-center space-x-2"></div> */}

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
