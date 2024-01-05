"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useUIstore } from "@/store";
import { PlusIcon, XIcon } from "lucide-react";
function AddNewItem() {
  const { createModalIsOpen, toggleCreateModal } = useUIstore();
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={() => toggleCreateModal()}
      >
        <PlusIcon></PlusIcon>
      </Button>

      <Dialog open={createModalIsOpen} onOpenChange={toggleCreateModal}>
        {/* <DialogTrigger>open via dialog</DialogTrigger> */}
        <DialogContent>
          {/* <div className="absolute top-0 right-4 w-4 h-4">
            <Button
              className="rounded-full"
              onClick={() => toggleCreateModal()}
              variant="outline"
              size="icon"
            >
              <XIcon />
            </Button>
          </div> */}
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewItem;
