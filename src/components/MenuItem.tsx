"use client";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
type Props = {
  link: string;
  label: string;
  icon: React.ReactElement;
};

function MenuItem({ link, label, icon }: Props) {
    const pathname = usePathname()
  return (
    <li className={`hover:bg-foreground/10  rounded-md ${pathname == link ? 'bg-foreground/10': ''}`}>
      <Link href={link} className="flex items-center space-x-2 cursor-pointer py-1 px-2">
        <>{icon}</>

        <Label>{label}</Label>
      </Link>
    </li>
  );
}

export default MenuItem;
