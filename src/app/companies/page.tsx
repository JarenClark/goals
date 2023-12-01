import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/documents/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function CompanyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const supabase = createServerComponentClient({ cookies });
    // pagination stuff
    const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = 10;
  const start = page == 1 ? 0 : (page - 1) * perPage + 1;
  const finish = perPage * page;
  const { data: companies, count } = await supabase
    .from("companies")
    .select("id, name", { count: "exact" })
    .order('name', { ascending: true })
    .range(start, finish);

  return (
    <>
      <ProtectedContent>
        <div className="container py-16">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <TypographyH1>
                Companies <small> ({count})</small>
              </TypographyH1>
              <form>
                <Input placeholder="Search"></Input>
              </form>
            </div>
            <TypographyLead>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste sed non.
            </TypographyLead>
          </div>

          <ul className="mb-8 space-y-2">
            {companies?.map((comp, i) => (
              <li key={i} className="rounded-sm px-4 py-3  border">
                <div className="flex items-center justify-between">
                  <Link href={`/companies/${comp.id}`}>
                    <span className="text-xl text-teal">{comp.name}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
                    {/* PAGINATION */}
                    {count && count > perPage ? (
            <div className="flex my-8 items-center space-x-4 justify-center">
              <Link
                className={`${
                  page == 1 ? "pointer-events-none opacity-50" : ""
                }`}
                href={`/companies?page=${page > 1 ? page - 1 : 1}`}
              >
                <Button
                  disabled={page == 1}
                  variant={"outline"}
                  className="w-32"
                >
                  Previous
                </Button>
              </Link>
              <Link
                className={`${
                  count && page * perPage >= count
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                href={`/companies?page=${page + 1}`}
              >
                <Button variant={"outline"} className="w-32">
                  Next
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </ProtectedContent>
    </>
  );
}
