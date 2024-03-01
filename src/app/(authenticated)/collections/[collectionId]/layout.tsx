import BreadCrumbs from "@/components/BreadCrumbs";
import CollectionSelectNavigation from "@/components/CollectionSelectNavigation";
import Header from "@/components/Header";
import ItemsTable from "@/components/ItemsTable";
import { Label } from "@/components/ui/label";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

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
    { label: "Today", items: todayItems },
    { label: "This Week", items: thisWeekItems },
    { label: "This Month", items: thisMonthItems },
    { label: "Older", items: olderItems },
  ];

  return (
    <>
      <div className="relative h-screen">
        <Header />
        <div className="flex h-full">
          <div className="w-full  lg:w-1/3 border-r h-full">
            <ul>
              {groups.map((group, i) => (
                <React.Fragment key={i}>
                  {group.items.length > 0 ? (
                    <li className="p-4">
                      <Label className="text-muted">{group.label}</Label>
                      <ul>
                        {group.items.map((item, j) => (
                          <li key={j} className="p-2 px-3 text-sm">
                            <Link
                              href={`/collections/${params.collectionId}/${item.id}`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : null}
                </React.Fragment>
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
