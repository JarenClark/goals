"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import deleteItem from "@/app/(authenticated)/actions/deleteItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import DeleteItem from "./modals/DeleteItemModal";
import DeleteItemModal from "./modals/DeleteItemModal";
import { useItemStore } from "@/store";
type Item = {
  id: string;
  title: string;
  collection_id: string;
};
type Props = {
  heading?: string;
  items: Item[];
};

function ItemsTable({ heading, items }: Props) {
  const { item, setItem, clearItem, setDeleteModalIsOpen } = useItemStore();

  return (
    <>
      <Table className="border">
        <TableBody>
          {items?.map((item, i) => (
            <React.Fragment key={i}>
              <TableRow>
                <TableCell>
                  <Link
                  passHref
                    className="hover:text-underline"
                    href={`/collections/${item.collection_id}/${item.id}`}
                  >
                    {item.title}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `/collections/${item.collection_id}/${item.id}`
                          )
                        }
                      >
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
                      <DropdownMenuItem
                        onClick={() => {
                          setItem(item.id);
                          setDeleteModalIsOpen(true);
                        }}
                      >
                        Delete Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>{" "}
      {/* <DeleteItemModal id={""} title={""} collection_id="" /> */}
    </>
  );
}

export default ItemsTable;
