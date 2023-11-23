"use client";
import { useDocumentStore } from "@/store";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makeRandomId } from "@/lib/utils";
function DocumentList() {
  const addDoc = useDocumentStore((state) => state.addDocument);
  const toast = useToast();
  //   const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("submitForm happening");

    // addDoc({
    //   id: makeRandomId(10),
    //   title: title,
    //   type: "AOR",
    //   year: new Date(),
    // });
    // setId('')
    setTitle("");
  };
  return (

        <form onSubmit={submitForm}>
          <fieldset className="my-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            {/* <div>
              <Input
                placeholder="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div> */}
            <div>
              <Input
                placeholder="Company Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Contract Type " />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Contract Type</SelectLabel>
                    <SelectItem value="AOR">AOR</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
            <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Contract Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Contract Year</SelectLabel>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Create SOW</Button>
          </fieldset>
        </form>

  );
}

export default DocumentList;
