import ProtectedContent from "@/components/ProtectedContent";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  TypographyH1,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import { makeExcerpt } from "@/lib/utils";
import { useNotestore } from "@/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PlusCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function NotesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  // text search
  const query = searchParams?.query || "";

  // db call
  const { data: notes } = await supabase.from("notes").select("*");
  // const { resetNote } = useNotestore();
  // resetNote()
  return (
    <>
      <ul className="flex flex-wrap max-w-3xl w-full -mx-2 items-stretch">
        {notes?.map((note, i) => (
          <li key={i} className="px-2 w-full sm:w-1/2 lg:w-1/3 flex mb-4">
            <Link href={`/notes/${note.id}`} className="flex w-full">
              <Card className="hover:bg-black/10 dark:hover:bg-white/10 h-full w-full flex flex-col">
                <CardHeader className="lg:min-h-[110px]">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <TypographyMuted>
                      {/* <div dangerouslySetInnerHTML={}></div> */}
                      <div>{makeExcerpt(note.content)}</div>
                    </TypographyMuted>
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
        <li className="px-2 w-1/2 lg:w-1/3 mb-4 flex">
          <Card className="w-full flex justify-center items-center hover:bg-black/10 dark:hover:bg-white/10 py-14">
            <PlusCircleIcon />
          </Card>
        </li>
      </ul>
    </>
  );
}
