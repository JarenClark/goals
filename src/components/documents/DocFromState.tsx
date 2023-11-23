"use client";
import React, { useEffect } from "react";
import { useDocumentStore } from "@/store";
type Props = { id: string };

function DocFromState({ id }: Props) {
  const doc = useDocumentStore((state) => state.document);
  const { setDocument } = useDocumentStore();
  useEffect(() => {
    setDocument(id);
  }, []);
  if (doc.title == null) return null;
  return (
    <div className="py-2">
      Doc From Zustand State is:
      <br />
      <div className="max-w-sm">{JSON.stringify(doc.title, null, 2)}</div>
    </div>
  );
}

export default DocFromState;
