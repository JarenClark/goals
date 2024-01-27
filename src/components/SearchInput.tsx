"use client";
import React, { useEffect, useRef, Ref } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

type Props = {};

export default function SearchInput({}: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("query");
  const pathname = usePathname();
  const ref = useRef<HTMLInputElement | null | undefined>();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && ref.current) {
        event.preventDefault();
        ref.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  
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
        ref={ref as Ref<HTMLInputElement>}
        placeholder="Search"
        defaultValue={q as string}
        onChange={(e) => handleSearch(e.target.value)}
      ></Input>
    </form>
  );
}
