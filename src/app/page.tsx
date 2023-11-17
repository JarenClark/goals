import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { TypographyH1 } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: docs, count } = await supabase.from("documents").select("id, title", {count: 'exact'});

  return (
    <>
      {/* <ProtectedContent> */}
      <div className="container py-16">
        <div className="mb-8 flex items-center justify-between">
          <TypographyH1>Documents <small> ({count})</small></TypographyH1>
          <form>
            <Input placeholder="Search">
            
            </Input>
          </form>
        </div>

        <DocumentList initialDocs={docs} />
      </div>
      {/* </ProtectedContent> */}
    </>
  );
}
