import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import Header from "@/components/Header";
import ItemsTable from "@/components/ItemsTable";
import TruncatedContent from "@/components/TruncatedContent";
import { Label } from "@/components/ui/label";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import ActivePathOverlay from "@/components/ActivePathOverlay";
import {
  BoxesIcon,
  CircleEllipsisIcon,
  DotIcon,
  GalleryHorizontal,
  GalleryThumbnails,
  Grid2X2Icon,
  ListIcon,
  Table2Icon,
} from "lucide-react";
import Ellipsis from "@/components/ui/Ellipsis";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import ItemLabelList from "@/components/ItemLabelList";

type Props = {
  params: { collectionId: string; itemId?: string };
  children: React.ReactNode;
  item?: React.ReactNode;
};

export default async function CollectionLayout({
  params,
  item,
  children,
}: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data: collection } = await supabase
    .from("_collections")
    .select("*")
    .eq("id", params.collectionId)
    .single();

  const { data: items, count } = await supabase
    .from("_items")
    .select("*", { count: 'exact' })
    .eq("collection_id", params.collectionId)
    .order("updated_at", { ascending: false })
    .is("parent_item", null);

  //   const collection = await collections?.find(
  //     (x) => x.id == params.collectionId
  //   );

  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  const thisWeek = new Date(now);
  thisWeek.setDate(thisWeek.getDate() - now.getDay()); // Set date to the first day of the week
  thisWeek.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  const thisMonth = new Date(now);
  thisMonth.setDate(1); // Set date to the first day of the month
  thisMonth.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  const todayItems: any[] = [];
  const thisWeekItems: any[] = [];
  const thisMonthItems: any[] = [];
  const olderItems: any[] = [];
  if (!!items) {
    items.forEach((item) => {
      const updatedAt = new Date(item.updated_at);

      if (updatedAt >= today) {
        todayItems.push(item);
      } else if (updatedAt >= thisWeek) {
        thisWeekItems.push(item);
      } else if (updatedAt >= thisMonth) {
        thisMonthItems.push(item);
      } else {
        olderItems.push(item);
      }
    });
  }

  const groups = [
    { label: "Today", items: todayItems, timeFormat: "hh:mm b" },
    { label: "This Week", items: thisWeekItems, timeFormat: "EEEE" },
    { label: "This Month", items: thisMonthItems, timeFormat: "MM/dd/yyyy" },
    { label: "Older", items: olderItems, timeFormat: "MM/dd/yyyy" },
  ];

  const filtered = groups.filter((x) => (x.items.length > 0 ? true : false));
  return (
    <>
      <div className="relative h-screen">
        <div className="flex w-full justify-between px-4 py-4 border-b">
          <div className="flex items-center  space-x-2 text-white">
            <BoxesIcon className="w-5 h-5" />
            <TypographyH3>{collection.name}</TypographyH3>{" "}
          </div>
          <div className="text-muted-foreground flex space-x-0">
            <Ellipsis />
          </div>
        </div>

        <div className="flex w-full justify-between px-4 py-2 border-b">
          <div className="flex items-center  space-x-2 text-white">
            <Label>{count} Entries</Label>
          </div>
          <ul className="text-muted-foreground flex space-x-1">
            <li>
              <ListIcon />
            </li>
            <li>
              <Grid2X2Icon />
            </li>
            <li>
              <Table2Icon />
            </li>
          </ul>
        </div>

        {!!items ? (
          <div className="px-4 py-2">
            {/* Gallery  */}
            <ul className="flex flex-wrap -mx-3">
              {items.map((item,i) => (
                <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3" key={i}>
                  <div className="rounded-lg border p-2">
                    <Label>{item.title}</Label>
                    <ItemLabelList itemId={item.id} />
                  </div>
                </li>
              ))}
            </ul>
            {/* List  */}
            {/* Table */}
          </div>
        ) : null}
        {item}
      </div>
      <div id="modal-root" />
    </>
  );
}
