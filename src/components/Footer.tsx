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
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIstore } from "@/store";
import AddNewItem from "./AddNewItem";
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
    <footer className="border-t">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Label>Goals&nbsp;&copy;{new Date().getFullYear()}</Label>
          <AddNewItem />

          {/* <Button variant="outline" size="icon" className="rounded-full" onClick={() => toggleCreateModal}>
              <PlusIcon></PlusIcon>
            </Button> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
