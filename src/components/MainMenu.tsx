"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
type Props = { collections: any[] };

function MainMenu({ collections }: Props) {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      {isDesktop ? null : (
        <Drawer>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default MainMenu;
