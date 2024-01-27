import BreadCrumbs from "@/components/BreadCrumbs";
import ProtectedContent from "@/components/ProtectedContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function AllOfMyCollections({}: Props) {
  const supabase = createServerComponentClient({ cookies });
  const { data: collections } = await supabase.from("_collections").select("*");

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <BreadCrumbs
          linkItems={[
            { link: "/", text: "Dashboard" },
            { link: "/collections", text: "Collections" },
          ]}
        ></BreadCrumbs>
      </div>
      <Card className=" rounded-xl relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.1)] dark:from-[rgba(255,255,255,0.1)]"></div> */}
        <CardHeader className="">
          <CardTitle>Collections</CardTitle>
        </CardHeader>
      </Card>
      <div className=" ">
        <div className=" mt-2 mb-8 px-6">
          <TypographyLead>Your stuff is all here.</TypographyLead>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableBody>
                {collections?.map((c, i) => (
                  <TableRow
                    key={i}
                    className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4"
                  >
                    <TableCell>
                      <Link href={`/collections/${c.id}`}>{c.name}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
