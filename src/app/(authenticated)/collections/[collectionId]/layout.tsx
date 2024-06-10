import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import ItemsTable from "@/components/ItemsTable";
import TruncatedContent from "@/components/TruncatedContent";
import { Label } from "@/components/ui/label";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import ActivePathOverlay from "@/components/ActivePathOverlay";

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
    .eq("collection_id", params.collectionId)
    .single();

  const { data: items } = await supabase
    .from("_items")
    .select("*")
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
  
        <div className="flex h-full">
          <div className="w-full  lg:w-1/3 border-r h-full">
            <ul>
              {filtered.map((group, i) => (
                <li className="p-4" key={i}>
                  {/* {filtered.length > 1 ? (
                    ) : null} */}
                  <Label className="text-black/50 dark:text-white/50">
                    {group.label}
                  </Label>

                  <ul>
                    {group.items.map((item, j) => (
                      <li key={j} className="text-sm relative">
                        <Link
                          className="relative p-2 px-3 rounded-lg overflow-hidden block"
                          href={`/collections/${params.collectionId}/${item.id}`}
                        >
                            <ActivePathOverlay link={`/collections/${params.collectionId}/${item.id}`} />
                          <Label>{item.title}</Label>
                          <div className="flex space-x-2 text-black/50 dark:text-white/50">
                            <time className="text-foreground text-[0.75rem]">
                              {format(
                                new Date(item.updated_at),
                                group.timeFormat
                              )}
                            </time>
                            <TruncatedContent content={item.content} />
                          </div>
                          {/* <pre>{JSON.stringify(item.content, null, 2)}</pre> */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-2/3 h-full pt-20">{children}</div>
        </div>
        {item}
      </div>
      <div id="modal-root" />
    </>
  );
}
