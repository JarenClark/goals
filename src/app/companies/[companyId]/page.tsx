import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

export default async function CompanyPage({
  params,
}: {
  params: { companyId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", params.companyId)
    .single();
  if (!company) return null;

  return (
    <div className="container py-20">
      <Card>
        <CardHeader>
          <CardTitle>{company.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(company, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
