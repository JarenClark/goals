"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
type Props = {};

function BreadCrumbsForNav({}: Props) {
  const params = useParams();
  const pathname = usePathname();
  return null;
  return (
    <div>
      <pre>{JSON.stringify([pathname, params], null, 2)}</pre>
    </div>
  );
}

export default BreadCrumbsForNav;
