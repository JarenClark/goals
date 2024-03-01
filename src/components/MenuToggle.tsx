"use client";
import React from "react";
import { MenuIcon } from "lucide-react";
import { useUIstore } from "@/store";
type Props = {};

function MenuToggle({}: Props) {
  const {openSideNav } = useUIstore()
  return (
    <>
      <div onClick={() => openSideNav()} className="cursor-pointer">
        <MenuIcon />
      </div>
    </>
  );
}

export default MenuToggle;
