import BreadCrumbs from "@/components/BreadCrumbs";
import ProtectedContent from "@/components/ProtectedContent";
import {
  TypographyH2,
  TypographyLead,
  TypographyMuted,
} from "@/components/ui/typography";
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuickAdd from "@/components/QuickAdd";
import deleteItem from "../../actions/deleteItem";
import { Button } from "@/components/ui/button";
import ItemsTable from "@/components/ItemsTable";
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
    .eq("collection_id", params.collectionId)
    .is("parent_item", null);
  // .eq("parent_item",null);

  // function handleSelectChange(x) {
  //   console.log('new value is ,',x)
  // }
  return (
    <>
      <div className="relative">
      </div>
    </>
  );
}
