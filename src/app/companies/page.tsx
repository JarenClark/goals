import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { TypographyH1 } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import Link from "next/link";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: companies, count } = await supabase
    .from("companies")
    .select("id, title", { count: "exact" })
    .range(0, 10);

  return (
    <>
      <ProtectedContent>
      <div className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <TypographyH1>
            Companies <small> ({count})</small>
          </TypographyH1>
          <form>
            <Input placeholder="Search"></Input>
          </form>
        </div>
        <ul className="mb-8 space-y-2">
          {companies?.map((comp, i) => (
            <li key={i} className="rounded-sm px-4 py-3  border">
              <div className="flex items-center justify-between">
                <Link href={`/companies/${comp.id}`}>
                  <span className="text-xl text-teal">{comp.title}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </ProtectedContent>
    </>
  );
}
