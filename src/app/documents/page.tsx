import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/documents/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

   // pagination stuff
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = 10;

  const start = page == 1 ? 0 : ((page - 1) * perPage) + 1;
  const finish = perPage * page;

  const { data: docs, count } = await supabase
    .from("documents")
    .select("id, title", { count: "exact" })
    .range(start, finish);

  //page 1 = 0,10
  //page 2 == 11, 20
  // page 3 == 21,30

  return (
    <>
      <ProtectedContent>
        <div className="container py-16">
          <div className="mb-8">
            <div className="flex mb-2 items-center justify-between">
              <TypographyH1>
                Documents <small> ({count})</small>
              </TypographyH1>
              <form>
                <Input placeholder="Search"></Input>
              </form>
            </div>

            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>

          <DocumentList initialDocs={docs} />
          <div className="flex my-8 items-center space-x-4 justify-center">
            <Link className={`${page == 1 ? 'pointer-events-none opacity-50' : ''}`} href={`/documents?page=${page > 1 ? page - 1 : 1}`}>
              <Button disabled={page == 1} variant={"outline"} className="w-32">
                Previous
              </Button>
            </Link>
            <Link className={`${count && (page * perPage) >= count ? 'pointer-events-none opacity-50' : ''}`} href={`/documents?page=${page + 1}`}>
              <Button variant={"outline"} className="w-32">
                Next
              </Button>
            </Link>
          </div>
        </div>
      </ProtectedContent>
    </>
  );
}
