import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import CompanyLinkName from "@/components/CompanyLinkName";
import { redirect } from "next/navigation";
import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import {
  ArrowDownUpIcon,
  EyeIcon,
  ForwardIcon,
  RedoIcon,
  SaveIcon,
  SettingsIcon,
  UndoIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DocumentSettingsMenu from "@/components/documents/DocumentSettingsMenu";
import DocumentSettingsMenuToggler from "@/components/documents/DocumentSettingsMenuToggler";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Dropdown } from "react-day-picker";
import DeliverablesTable from "@/components/documents/DeliverablesTable";
import PaymentSchedule from "@/components/documents/PaymentSchedule";

export default async function DocumentPage({
  params,
}: {
  params: { docId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("id", params.docId)
    .single();

  if (!document) return null;

  return (
    <ProtectedContent>
      <div className="p-1 flex justify-center">
        <DocumentSettingsMenu />
      </div>
      {/* HEADER */}
      <div className="container flex justify-between py-2 border-b">
        <div className="flex space-x-2">
          <UndoIcon />
          <RedoIcon />
        </div>
        <TypographyH3>{document?.title}</TypographyH3>
        <div className="flex space-x-2">
          <EyeIcon />
          <ArrowDownUpIcon />
          <DocumentSettingsMenuToggler />
          <SaveIcon />
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className=" bg-secondary border-r min-w-lg w-full max-w-2xl">
          <ScrollArea className="h-[90vh]">
            <div className="p-4">
              <Card>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Deliverables</AccordionTrigger>
                      <AccordionContent>
                        <DeliverablesTable content={document.content} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Payment Schedule</AccordionTrigger>
                      <AccordionContent>
                        <PaymentSchedule docId={params.docId}/>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Team</AccordionTrigger>
                      <AccordionContent>TEAM SELECT HERE</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
        {/* <Separator orientation="vertical"/> */}
        {/* MAIN */}
        <div className="">
          <ScrollArea className="h-[90vh]">
            <div className="p-4">
              <div className="container py-16">
                {/* DELIVERABLES */}
                <DeliverablesTable content={document.content} />

                <Card>
                  <CardContent>
                    {document?.company_ref ? (
                      <div className="mb-4">
                        <CompanyLinkName companyId={document.company_ref} />
                      </div>
                    ) : null}

                    {/* <pre>{JSON.stringify(document, null, 2)}</pre> */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </ProtectedContent>
  );
}
