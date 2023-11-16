import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import CompanyLinkName from "@/components/CompanyLinkName";
export default async function DocumentPage({
  params,
}: {
  params: { docId: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("id", params.docId)
    .single();

  if (!document) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-20">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {document.company_ref ? (
            <div className="mb-4">
              <CompanyLinkName companyId={document.company_ref} />
            </div>
          ) : null}

          <pre>{JSON.stringify(document, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
