import CreateDocument from "@/components/CreateDocument";
import DocumentList from "@/components/DocumentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: docs } = await supabase
    .from("documents")
    .select("id, title");
    console.log(`docs are`, docs)

  return (
    <>
      <div className="container py-20">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>

          <DocumentList initialDocs={docs} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
