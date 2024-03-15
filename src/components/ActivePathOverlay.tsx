"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = { link: string };

function ActivePathOverlay({ link }: Props) {
  const pathname = usePathname();
  if (pathname == link) {
    return (
      <div className=" pointer-events-none absolute inset-0 bg-black/5 dark:bg-white/5"></div>
    );
  }
  return null;
}

export default ActivePathOverlay;
