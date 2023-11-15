"use client";
import React from "react";
// import { PlusCircleIcon } from "lucide-react";
import CreateDocument from "@/components/CreateDocument";
import { usePathname } from "next/navigation";

type Props = {};

function Footer({}: Props) {
  const pathname = usePathname();
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
