//import CreateDocument from "@/components/CreateDocument";
import type { Metadata } from "next";
import DocumentList from "@/components/documents/DocumentList";
import ProtectedContent from "@/components/ProtectedContent";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
//import Image from "next/image";
import { TypographyH1, TypographyLead, TypographyP } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DocumentSearchInput from "@/components/documents/DocumentSearchInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tasks",
  description: "",
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  // text search
  const query = searchParams?.query || "";

  // db call
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*");
  // .range(start, finish);

  return (
    <>
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="flex mb-2 items-center justify-between">
              <TypographyH1>
                Tasks
              </TypographyH1>
            </div>

            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>
          <Tabs defaultValue="details" className="">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Today</TabsTrigger>
              <TabsTrigger value="revisions">This Week</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <p>details</p>
            </TabsContent>
            <TabsContent value="revisions">
              <Card>
                <CardContent className="space-y-2">
                  <div className="text-center mt-4 uppercase tracking-wide text-muted-foreground">
                    <TypographyP>No Recent Revisions</TypographyP>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="other">
              <p>other</p>
            </TabsContent>
          </Tabs> 
          <pre>{JSON.stringify(tasks, null, 2)}</pre>
        </div>
      </ProtectedContent>
    </>
  );
}
