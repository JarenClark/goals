"use client";
import Link from "next/link";
import React from "react";
import { Label } from "@/components/ui/label";
import { useParams, usePathname } from "next/navigation";
import MenuItem from "./MenuItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
type Props = {
  link: string;
  label: string;
  icon: React.ReactElement;
  childItems: any[] | null;
};

export default function MenuItemDropdown({
  link,
  label,
  icon,
  childItems,
}: Props) {
  if (!childItems || childItems.length == 0) {
    return <MenuItem link={link} label={label} icon={icon} />;
  }
  const pathname = usePathname();
  const params = useParams()
  return (
    <li
      className={` rounded-md text-muted-foreground`}
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="py-0">
            <div className="flex items-center space-x-2 cursor-pointer py-1 px-2">
              <div
                className={` rounded-md p-1 ${
                  pathname == link
                    ? " bg-background text-foreground "
                    : "bg-black/5 dark:bg-white/5"
                }`}
              >
                {icon}
              </div>

              <Label className="cursor-pointer">{label}</Label>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <ul className="pl-11 list-disc123">
              {childItems.map((child, j) => (
                <li key={j}>
                  <Link href={`/collections/${child.id}`} className={`${params.collectionId && params.collectionId == child.id ? `text-black dark:text-white` : `"hover:text-black dark:hover:text-white"`} block`}>
                    <div className="py-[2px]">
                      <Label>{child.name}</Label>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
