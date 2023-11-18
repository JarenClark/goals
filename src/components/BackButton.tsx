"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
type Props = {};

function BackButton({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname == "/") return null;
  return (
    <button type="button" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </button>
  );
}

export default BackButton;
