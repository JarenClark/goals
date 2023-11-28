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
import Image from "next/image";
import ContactHTML from "@/components/documents/ContactHTML";
import TeamMembersInArrayOfOldIDs from "@/components/team/TeamMembersInArrayOfOldIDs";
import { useDocumentStore } from "@/store";
import DocFromState from "@/components/documents/DocFromState";
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

  const { data: details } = await supabase
  .from("document_details")
  .select("*")
  .eq("document_id", params.docId)
  .single()
  // const trimmed = { ...document };
  // trimmed.content = {};
  // trimmed.team = null;
  return (
    <ProtectedContent>
      <div className="p-1 flex justify-center">
        <DocumentSettingsMenu doc={document} />
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
      <div className="flex justify-center">
        <DocFromState id={params.docId} />
        {/** example of getting the documetn from state */}
      </div>
      {/* EDITOR */}
      <div className="flex w-screen overflow-x-hidden">
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
                      <DeliverablesTable content={details.content} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Payment Schedule</AccordionTrigger>
                      <AccordionContent>
                        <PaymentSchedule docId={params.docId} />
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Team</AccordionTrigger>
                      <AccordionContent>
                        <TeamMembersInArrayOfOldIDs ids={document.team} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
        {/* <Separator orientation="vertical"/> */}
        {/* MAIN */}
        <div className="w-full lg:max-w-[66vw]">
          <ScrollArea className="h-[80vh]">
            <div className="p-4 max-w-[66vw]">
              <div className="container mx-auto">
                {/** COMPANY LOGOS */}
                <div className="flex justify-between">
                  <Image
                    src={"/tn_logo.svg"}
                    width={235}
                    height={71}
                    alt={"That's Nice, LLC"}
                  ></Image>
                  {details.rest && details.rest.logo ? (
                    <img
                      style={{ maxWidth: "500px" }}
                      src={details.rest.logo}
                    />
                  ) : null}
                </div>

                {/* CONTACT HTML */}
                {details.rest && details.rest.contactHTML ? (
                  <ContactHTML h={details.rest.contactHTML} />
                ) : null}
                {/* DELIVERABLES */}
                <DeliverablesTable content={details.content} />
              </div>
            </div>
            <div className="max-w-4xl overflow-x-hidden">
              {/**
               *
               *
               * Just seeing the shape of our data
               *
               */}
               <TypographyH3>DOCUMENT:</TypographyH3>
              <pre>{JSON.stringify(document, null, 4)}</pre>

                            {/**
               *
               *
               * Just seeing the shape of our data
               *
               */}
                <TypographyH3>DOCUMENT DETAILS:</TypographyH3>
              <pre>{JSON.stringify(details, null, 4)}</pre>
            </div>
          </ScrollArea>
        </div>
      </div>
    </ProtectedContent>
  );
}
