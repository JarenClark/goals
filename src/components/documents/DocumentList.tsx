"use client";
import { useStore } from "@/store";
import React, { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Badge } from "../ui/badge";
import StatusBadge from "./StatusBadge";

type Doc = {
  id: string;
  title: string;
  status: string;
  master: boolean;
};
function DocumentList({ initialDocs }: { initialDocs: Doc[] | null }) {
  // const [docsToShow, setDocsToShow] = useState<Doc[] | null>(null)

  return (
    <ul className="mb-8 space-y-2">
      {initialDocs?.map((doc, i) => (
        <li key={i} className="rounded-md px-4 py-3  border">
          <div className="flex items-center justify-between">
            <Link href={`/documents/${doc.id}`}>
              <span className="text-xl text-teal">{doc.title}</span>
            </Link>
            {doc.master == true ? (
              <Badge className=" bg-darkOrange dark:text-white">Master</Badge>
            ) : (
              <StatusBadge status={doc.status} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default DocumentList;
