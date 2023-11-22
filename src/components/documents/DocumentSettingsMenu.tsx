"use client";
import React from "react";
// import {docMenuIs}
import { useStore } from "@/store";
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
import DisplayNameByOldID from "../team/DisplayNameByOldID";
import { TypographyP } from "../ui/typography";
import { ScrollArea } from "@radix-ui/react-scroll-area";



type Props = { doc: any };

function DocumentSettingsMenu({ doc }: Props) {
  const isOpen = useStore((state) => state.docMenuIsOpen);
  const toggle = useStore((state) => state.setDocMenuIsOpen);
  return (
    <>
      <Sheet open={isOpen}>
        {/* <SheetOverlay onClick={() => toggle(false)} /> */}
        <SheetContent className=" h-full flex flex-col justify-between sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SheetHeader>
            <SheetClose
              onClick={() => toggle(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>

            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Make changes here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4"></div>
          <Tabs defaultValue="details" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="revisions">Revisions</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card className="mt-4">
                {/* <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader> */}
                <CardContent className="space-y-2">
                  <ScrollArea>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="sow_number"
                      >
                        SOW Number
                      </Label>
                      <Input id="sow_number" defaultValue={doc.doc_number} />
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Company Name
                      </Label>
                      <Input id="username" defaultValue={doc.company} />
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="sow_number"
                      >
                        Contract type
                      </Label>
                      <Input id="sow_number" defaultValue={doc.type} />
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Custom Type
                      </Label>
                      <Input id="username" defaultValue={doc.custom} />
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="sow_number"
                      >
                        SOW Type
                      </Label>
                      <Input id="sow_number" defaultValue={doc.doc_type} />
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Contract Year
                      </Label>
                      <Input id="username" defaultValue={doc.year} />
                    </div>

                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Currency
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        SOW Date
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Signature Date
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Address
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Sales Person
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Account Management
                      </Label>
                    </div>
                    <div className="space-y-1">
                      <Label
                        className="text-muted-foreground"
                        htmlFor="username"
                      >
                        Internal Logo
                      </Label>
                    </div>
                  </ScrollArea>
                </CardContent>
                {/* <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter> */}
              </Card>
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
          </Tabs>
          <SheetFooter className="mt-auto">
            <div className="w-full">
              <div className="border-t">
                <div className="flex my-4">
                  <div className="">
                    <Label className="text-muted-foreground">Created by</Label>
                    <DisplayNameByOldID
                      italic={true}
                      old_id={doc.created_by as string}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={() => toggle(false)}>Save</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DocumentSettingsMenu;
