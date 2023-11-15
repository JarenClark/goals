"use client";
import { useStore } from "@/store";
import React, { useState, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type Doc = {
    id: string;
    title: string;
}
function DocumentList({ initialDocs }: { initialDocs: Doc[] | null }) {
  // from state
//   const documents = useStore((state) => state.documents);
//   {
//     documents.map((doc, i) => (
//       <li key={i}>
//         <Link href={`/documents/${doc.id}`}>{doc.title}</Link>
//       </li>
//     ));
//   }

  return (

      <ul className="mb-8 space-y-2">
        {initialDocs?.map((doc, i) => (
          <li key={i}>
            <Link href={`/documents/${doc.id}`}>- {doc.title}</Link>
          </li>
        ))}
      </ul>
  );
}

export default DocumentList;
