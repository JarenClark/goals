"use client";
import React, { useEffect } from "react";

type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet-large";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/store";
import { Button } from "@/components/ui/button";
function InterceptedItemPage({ params }: Props) {
  const router = useRouter();
  const { item, setItem } = useItemStore();
  useEffect(() => {
    if (!item || item.id != params.itemId) {
      setItem(params.itemId);
    }
  }, [item]);

  return (
    <>
      {!!item && item.id == params.itemId ? (
        <Sheet open={true} onOpenChange={() => router.back()}>
          {/* <SheetTrigger>Open</SheetTrigger> */}
          <SheetContent  className="w-screen bg-muted flex flex-col">
            <SheetHeader>
              <SheetTitle>{item?.title}</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="mt-auto">
              <Button variant={"outline"}>Delete</Button>
              </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
}

export default InterceptedItemPage;
