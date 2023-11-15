import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

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
    <div className="container py-20">
      <Card className="p-4">
        <CardTitle>{document.title}</CardTitle>
        <CardContent>
          <pre>{JSON.stringify(document, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
