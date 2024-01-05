"use client";
import React from "react";
import { MenuIcon } from "lucide-react";
import { useUIstore } from "@/store";
type Props = {};

function MenuToggle({}: Props) {
    const toggleSideNav = useUIstore((state) => state.toggleSideNav);
  return (
    <>
      <div onClick={() => toggleSideNav()} className="cursor-pointer">
        <MenuIcon />
      </div>
    </>
  );
}

export default MenuToggle;
