import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "bright";

import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

import RenderContent from "@/components/RenderContent";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};
type ItemType = {
  title: string;
  description: string;
  content: string;
  collection_id: string;
  _collections: { name: string };
};
export default async function ItemPage({ params }: Props) {
  //   const { theme } = useTheme();
  const supabase = createServerComponentClient({ cookies });
  const { data: item }: any = await supabase
    .from("_items")
    .select("user_id,title, content,collection_id, _collections(name)")
    .eq("id", params.itemId)
    .single();

  const { data: children }: any = await supabase
    .from("_items")
    .select("title, content")
    .eq("parent_item", params.itemId);
  function returnToCollection() {
console.log('hello world')
  }
  return (
    <>
      {item && (
        <div className=" px-8 py-16">
          <div className="mb-4">
            <CardTitle>{item.title}</CardTitle>
          </div>
          {item.content && (
            <Card>
              <CardHeader>
                <TypographyMuted>Content</TypographyMuted>
              </CardHeader>
              <CardContent>
                <RenderContent html={item.content} />
              </CardContent>
            </Card>
          )}
          {/* <div>
            <pre>{JSON.stringify(collection, null, 2)}</pre>
          </div> */}
          {!!children && children.length > 0 ? (
            <Card>
              <CardHeader>Subitems</CardHeader>
              <CardContent>
                <Table>
                  {children.map((child: { title: string }, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{child.title}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </CardContent>
            </Card>
          ) : null}
          {/* <div>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div> */}
        </div>
      )}
    </>
  );
}