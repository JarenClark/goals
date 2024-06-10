"use client";
import React, { useEffect, useState } from "react";
// import { PlusCircleIcon } from "lucide-react";
import CreateDocument from "@/components/CreateDocument";
import { usePathname } from "next/navigation";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Label } from "@/components/ui/label";
import { HomeIcon, LibraryIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIstore } from "@/store";
import AddNewItem from "./AddNewItem";
import Link from "next/link";
type Props = {};

function Footer({}: Props) {
  const pathname = usePathname();
  const { toggleCreateModal } = useUIstore();
  // const supabase = createClientComponentClient();
  // const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  // useEffect(() => {
  //   const checkAuth = () => {
  //     console.log("...");
  //   };
  // }, []);

  // if(!isLoggedIn) return null
  return (
    <footer className="border-t-2 block sm:hidden fixed py-2 rounded-t-2xl bottom-0 left-0 w-screen bg-background">
      <div className="container">
        <ul className="flex items-center justify-center space-x-2">
        <li className="rounded-lg old-bg-black/5 old-dark:bg-white/5 bg-secondary">
            <Link className="block p-2"href={"/"}>
              <HomeIcon></HomeIcon>
            </Link>
          </li>
          <li className="rounded-lg old-bg-black/5 old-dark:bg-white/5 bg-secondary">
            <Link className="p-2 block" href={"/collections"}>
              <LibraryIcon />
            </Link>
          </li>
          <li></li>
          <li className="rounded-lg old-bg-black/5 old-dark:bg-white/5 bg-secondary">
            <AddNewItem />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
