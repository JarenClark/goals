"use client";
import React from "react";
// import { PlusCircleIcon } from "lucide-react";
import CreateDocument from "@/components/CreateDocument";
import { usePathname } from "next/navigation";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

function Footer({}: Props) {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if(!user) return null
  return (
    <footer className="border-t">
      <div className="container">
        {pathname == "/" ? (
          <div className="mb-4 flex justify-center">
            <CreateDocument />
          </div>
        ) : (
          <div className="flex justify-between py-4">
            <span>SOW Generator</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
