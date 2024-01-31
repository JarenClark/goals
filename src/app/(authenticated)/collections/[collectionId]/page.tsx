import BreadCrumbs from "@/components/BreadCrumbs";
import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowLeftIcon } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Props = {
  params: {
    collectionId: string;
  };
};

export default async function CollectionPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

  const { data: collections } = await supabase.from("_collections").select("*");

  const { data: items } = await supabase
    .from("_items")
    .select("*")
    .eq("collection_id", params.collectionId);

  // function handleSelectChange(x) {
  //   console.log('new value is ,',x)
  // }
  return (
    <>
      {collection && (
        <div className=" px-8 py-16">
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <div className="hidden md:inline-flex items-center space-x-2">
                <BreadCrumbs
                  linkItems={[
                    { link: "/", text: "Dashboard" },
                    { link: "/collections", text: "Collections" },
                    // {
                    //   link: `/collections/${params.collectionId}`,
                    //   text: collection.name,
                    // },
                  ]}
                />
                <div className="text-muted-foreground">/</div>
                {collections && collections.length > 1 ? (
                  <CollectionSelectNavigation
                    current={params.collectionId}
                    collections={collections}
                  />
                ) : (
                  // <Select defaultValue={params.collectionId} onValueChange={(x) => handleSelectChange(x)}>
                  //   <SelectTrigger className="w-[180px]">
                  //     <SelectValue placeholder="Select a fruit" />
                  //   </SelectTrigger>
                  //   <SelectContent>
                  //     <SelectGroup>
                  //       <SelectLabel>Collections</SelectLabel>
                  //       {collections?.map((item, i) => (
                  //         <SelectItem key={i} value={item.id}>
                  //           {item.name}
                  //         </SelectItem>
                  //       ))}
                  //     </SelectGroup>
                  //   </SelectContent>
                  // </Select>
                  <Label>{collection.name}</Label>
                )}
              </div>
            </div>
            <div className="mb-4">
              {" "}
              <CardTitle>{collection.name}</CardTitle>
            </div>
            <Card>
              {/* <CardHeader></CardHeader> */}
              <CardContent>
                <Table>
                  <TableHead className="text-muted-foreground">
                    <TableHeader>Title</TableHeader>
                  </TableHead>
                  <TableBody>
                    {items?.map((item, i) => (
                      <React.Fragment key={i}>
                        <TableRow>
                          <TableCell>
                            <Link
                            className="hover:text-underline"
                              href={`/collections/${params.collectionId}/${item.id}`}
                            >
                              {item.title}
                            </Link>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              {/* <CardFooter></CardFooter> */}
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
