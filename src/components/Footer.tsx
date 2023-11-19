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

type Props = {};

function Footer({}: Props) {
  const pathname = usePathname();
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
        {pathname == "/" ? (
          <div className="mb-4 flex justify-center">
            <CreateDocument />
          </div>
        ) : (
          <div className="flex justify-between py-4">
            <Label>SOW Generator</Label>
            <Label>That&apos;s Nice {new Date().getFullYear()}</Label>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
