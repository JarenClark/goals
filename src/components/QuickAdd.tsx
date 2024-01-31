"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner"

type CollectionType = {
  id: string;
  name: string;
};

type Props = {
  collections: CollectionType[];
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  collection_id: z.string(),
});

export default function QuickAdd({ collections }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      collection_id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast(
values.title,{
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title..." {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="collection_id"
            render={({ field }) => (
              <FormItem>
                <>
                  <FormLabel>Collection</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                    //   defaultValue={params?.collectionId ? params.collectionId : current.collectionId }
                    //   onValueChange={(x) => handleSelectChange(x)}
                  >
                    <FormControl>
                      <>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/* <SelectLabel>Collections</SelectLabel> */}
                            {collections?.map((item, i) => (
                              <SelectItem key={i} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>{" "}
                      </>
                    </FormControl>
                  </Select>

                  <FormMessage />
                </>
              </FormItem>
            )}
          />

          <Button type="submit" variant={"outline"}>
            Add New item
          </Button>
        </form>
      </Form>
    </>
  );
}
