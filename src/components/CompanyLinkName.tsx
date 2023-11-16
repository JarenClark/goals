import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
type Props = {
  companyId: string;
};

export default async function CompanyLinkName({ companyId }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: company } = await supabase
    .from("companies")
    .select("title")
    .eq("id", companyId)
    .single();

  if (!company) return null;
  return <Link href={`/companies/${companyId}`}>{company.title}</Link>;
}
