"use client";
import NoteEditor from "@/components/notes/NoteEditor";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyMuted } from "@/components/ui/typography";
import { useNotestore } from "@/store";
import React, { Suspense, useEffect, useState } from "react";

type Props = {};

export default function NotePage({ params }: { params: { noteId: string } }) {
  const note = useNotestore((state) => state.note);
  const { setNote, resetNote } = useNotestore();

  useEffect(() => {
    setNote(params.noteId);

    return () => {
      resetNote();
    };
  }, []);

  if (!note) return null;

  return (
    <div className="overflow-x-hidden">
      <Suspense>
        <Card>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <TypographyMuted>
              <NoteEditor />
            </TypographyMuted>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Suspense>
    </div>
  );
}
