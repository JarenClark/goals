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
    <li className={` rounded-md ${pathname == link ? ' text-black dark:text-white': ' hover:text-black dark:hover:text-white  text-muted-foreground'}`}>
      
      
      <Link href={link} className="flex items-center space-x-2 cursor-pointer ">
        <div className={` ${pathname == link  ? ' bg-background text-foreground ': 'bg-black/5 dark:bg-white/5'}`}>
          {icon}
          </div>

        <Label className="cursor-pointer">{label}</Label>
      </Link>
    </li>
  );
}

export default MenuItem;
