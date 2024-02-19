"use client";
import React from "react";
import deleteItem from "@/app/(authenticated)/actions/deleteItem";
import { useItemStore } from "@/store";
//import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CreateItemModal({}) {
  const { item, clearItem, createModalIsOpen, setCreateModalIsOpen } =
    useItemStore();
  if (!createModalIsOpen) return null;
  if (!item) return null;
  return (
    <>
      <Dialog open={createModalIsOpen} onOpenChange={setCreateModalIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Delete{" "}
              {item.title ? <span>"{item.title}"</span> : "selected item"}?
            </DialogTitle>
            <DialogDescription>This action is irreversible. </DialogDescription>
          </DialogHeader>
          <form
            action={async (formData: FormData) => {
              await deleteItem(formData).then((result) => {

                setCreateModalIsOpen(false)
                
                toast.success("Item successfully deleted!")
                clearItem()
              });
            }}
          >
            <input
              readOnly
              name="collection_id"
              type="text"
              value={item.collection_id}
              className="hidden"
            />
            <Input
              className="hidden"
              id="title"
              name="title"
              value={item.title}
              readOnly
            ></Input>

            <input
              readOnly
              name="id"
              type="text"
              value={item.id}
              className="hidden"
            />
            <Button
              size={"sm"}
              variant={"destructive"}
              type="submit"
              className="w-full mt-4"
            >
              Delete
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
