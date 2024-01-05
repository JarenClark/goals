import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
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
    <ProtectedContent>
      <div className="container">
        <div className="mb-8">
          <TypographyH1>{company.title}</TypographyH1>
        </div>
        <Card>
          <CardContent>
            <pre>{JSON.stringify(company, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </ProtectedContent>
  );
}
