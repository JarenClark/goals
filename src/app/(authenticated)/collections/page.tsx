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
      <div className="px-8 py-16">
        <div className="mb-2 flex items-center justify-between">
          <BreadCrumbs
            linkItems={[
              { link: "/", text: "Dashboard" },
              { link: "/collections", text: "Collections" },
            ]}
          ></BreadCrumbs>
        </div>
        <div className="mb-4">
              {" "}
              <CardTitle>Collections</CardTitle>
            </div>

        <div className=" ">
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
      </div>
    </>
  );
}
