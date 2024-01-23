//import CreateDocument from "@/components/CreateDocument";
import type { Metadata } from "next";
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
import ProjectsTable from "@/components/projects/ProjectsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Catgeories",
  description: "Generated by create next app",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  // text search
  const query = searchParams?.query || "";

  // db call
  const { data: categories } = await supabase.from("categories").select("*");
  // .range(start, finish);

  return (
    <>
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="flex mb-2 items-center justify-between">
              <TypographyH1>Categories</TypographyH1>
            </div>

            <TypographyLead>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sit.
            </TypographyLead>
          </div>
          {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
          <ul className="flex flex-wrap max-w-3xl w-full -mx-2 items-stretch">
            {categories?.map((cat, i) => (
              <li key={i} className="px-2 w-1/2 lg:w-1/3 mb-4">
                <Card className="hover:bg-black/10 dark:hover:bg-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">{cat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Lorem ipsum dolor sit amet consectetur...
                    </CardDescription>
                  </CardContent>
                </Card>
              </li>
            ))}
            <li className="px-2 w-1/2 lg:w-1/3 mb-4 flex">
              <Card className="w-full flex justify-center items-center hover:bg-black/10 dark:hover:bg-white/10 py-14">
                <PlusCircleIcon />
              </Card>
            </li>
          </ul>
        </div>
      </ProtectedContent>
    </>
  );
}