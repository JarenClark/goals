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
import { redirect } from "next/navigation";
import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH1 } from "@/components/ui/typography";
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

  return (
    <ProtectedContent>
      <div className="container py-16">
        <div className="mb-8">
          <TypographyH1>{document?.title}</TypographyH1>
        </div>
        <Card className="p-4">
          {/* <CardHeader>
            <CardTitle>{document?.title}</CardTitle>
          </CardHeader> */}

          <CardContent>
            {document?.company_ref ? (
              <div className="mb-4">
                <CompanyLinkName companyId={document.company_ref} />
              </div>
            ) : null}

            <pre>{JSON.stringify(document, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </ProtectedContent>
  );
}
