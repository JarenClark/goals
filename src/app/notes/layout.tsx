import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export default async function NotesLayout({
  children,
}: // footerContent,
{
  children: React.ReactNode;
  // footerContent?: React.ReactNode;
}) {
  // const supabase = createServerComponentClient({ cookies });

  // // text search

  // // db call
  // const { data: notes } = await supabase.from("notes").select("*");
  return (
    <ProtectedContent>
      <div className="container ">
        <div className="mb-8">
          <div className="flex mb-2 items-center justify-between">
            <Link href={"/notes"}>
              <TypographyH2>Notes</TypographyH2>
            </Link>
          </div>
          <TypographyLead>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            sit.
          </TypographyLead>
        </div>
        {children}
      </div>
    </ProtectedContent>
  );
}
