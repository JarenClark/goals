"use client";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
type Props = {
  link: string;
  label: string;
  icon: React.ReactElement;
  children?: Props[];
};

function MenuItem({ link, label, icon }: Props) {
    const pathname = usePathname()
  return (
    <li className={` rounded-md ${pathname.indexOf(link) > -1 ? ' bg-lime text-black': ' hover:text-white text-muted-foreground'}`}>
      <Link href={link} className="flex items-center space-x-2 cursor-pointer py-1 px-2">
        <div className={` rounded-md p-1 ${pathname.indexOf(link) > -1 ? ' bg-lime text-black ': 'bg-muted'}`}>{icon}</div>

        <Label className="cursor-pointer">{label}</Label>
      </Link>
    </li>
  );
}

export default MenuItem;
