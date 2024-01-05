"use client";
import { useUIstore } from "@/store";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

function StateHelper({}: Props) {
  const pathname = usePathname();
  const sideNavIsOpen = useUIstore((state) => state.sideNavIsOpen);

  const toggleSideNav = useUIstore((state) => state.toggleSideNav);
  useEffect(() => {
    if (sideNavIsOpen) {
      toggleSideNav(false);
    }
  }, [pathname]);
  return <></>;
}

export default StateHelper;
