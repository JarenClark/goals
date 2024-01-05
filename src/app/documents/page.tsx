//import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/documents/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
//import Image from "next/image";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DocumentSearchInput from "@/components/documents/DocumentSearchInput";

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
  const start = page == 1 ? 0 : (page - 1) * perPage + 1;
  const finish = perPage * page;

  // status filters

  // text search
  const query = searchParams?.query || '';

  // db call
  const { data: docs, count } = await supabase
    .from("documents")
    .select("id, title, status, master", { count: "exact" })
    .range(start, finish);

  return (
    <>
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="flex mb-2 items-center justify-between">
              <TypographyH1>
                Documents{" "}
                {count && count > 0 ? <small> ({count})</small> : null}
              </TypographyH1>

              <div className="flex space-x-4">
                <DocumentSearchInput />
              </div>
            </div>

            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>

          <DocumentList initialDocs={docs} />

          {/* PAGINATION */}
          {count && count > perPage ? (
            <div className="flex my-8 items-center space-x-4 justify-center">
              <Link
                className={`${
                  page == 1 ? "pointer-events-none opacity-50" : ""
                }`}
                href={`/documents?page=${page > 1 ? page - 1 : 1}`}
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
                href={`/documents?page=${page + 1}`}
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
