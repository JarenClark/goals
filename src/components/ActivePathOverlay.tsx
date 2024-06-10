"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = { link: string };

function ActivePathOverlay({ link }: Props) {
  const pathname = usePathname();
  if (pathname == link) {
    return (
      <div className=" pointer-events-none absolute inset-0 old-bg-black/5 old-dark:bg-white/5 bg-secondary"></div>
    );
  }
  return null;
}

export default ActivePathOverlay;
