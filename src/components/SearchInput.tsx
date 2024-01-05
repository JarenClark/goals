"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

type Props = {};

export default function SearchInput({}: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("query");
  const pathname = usePathname();

  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(term);
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.delete("page");
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <form>
      <Input
        placeholder="Search"
        defaultValue={q as string}
        onChange={(e) => handleSearch(e.target.value)}
      ></Input>
    </form>
  );
}
