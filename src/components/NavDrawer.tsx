"use client";

import React from "react";
import Menu from "./Menu";

// import {docMenuIs}
import { useDocumentStore, useUIstore } from "@/store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayNameByOldID from "@/components/team/DisplayNameByOldID";
import { TypographyP } from "@/components/ui/typography";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Props = {};

function NavDrawer({}: Props) {
  //const isOpen = useDocumentStore((state) => state.docMenuIsOpen);
  //const toggle = useDocumentStore((state) => state.setDocMenuIsOpen);
  const sideNavIsOpen = useUIstore((state) => state.sideNavIsOpen);
  const toggleSideNav = useUIstore((state) => state.toggleSideNav);
  return (
    <>
      <Sheet open={sideNavIsOpen}>
        {/* <SheetOverlay onClick={() => toggle(false)} /> */}
        <SheetContent className=" h-full flex flex-col justify-between sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SheetHeader className="pt-8">
            <SheetClose
              onClick={() => toggleSideNav()}
              className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>

            <SheetTitle>Goals</SheetTitle>
            <SheetDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima
              maxime doloribus culpa!{" "}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4"></div>
          <Menu />
          {/* <Tabs defaultValue="details" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="revisions">Revisions</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <p>details</p>
            </TabsContent>
            <TabsContent value="revisions">
              <Card>
                <CardContent className="space-y-2">
                  <div className="text-center mt-4 uppercase tracking-wide text-muted-foreground">
                    <TypographyP>No Recent Revisions</TypographyP>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs> */}
          <SheetFooter className="mt-auto"></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default NavDrawer;
