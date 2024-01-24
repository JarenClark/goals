"use client";
import React from "react";
import { usePathname, useParams } from "next/navigation";
import Greeting from "./Greeting";
import Link from "next/link";
type Props = {};

function BreadCrumbs({}: Props) {
  const paths = usePathname();
  const params = useParams<{ collectionId?: string; itemnId?: string }>();

  if (paths == "/") {
    return null;
  }
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <>
      <div className="flex space-x-2">
        <Link href={"/"}>Home</Link>

        {/* if were on the collections path */}
        {pathNames.indexOf("collections") > -1 ? (
          <>
            <span>/</span>
            <Link href={"/collections"}>Collections</Link>
            {/* if were in a specific collection path */}
            {params.collectionId ? (
              <>
                <span>/</span>
                <Link href={`/collections/${params.collectionId}`}>
                  Collection Name
                </Link>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(pathNames, null, 2)}</pre>
    </>
  );
}

export default BreadCrumbs;
