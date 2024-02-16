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
import { toast } from "sonner";
import Link from "next/link";
import insertItem from "@/app/(authenticated)/actions/insertItem";
import { useRouter } from "next/navigation";

type CollectionType = {
  id: string;
  name: string;
};

type Props = {
  collections: CollectionType[];
  shared?: CollectionType[];
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  collection_id: z.string({ required_error: "Collection is required" }),
  // user_id: z.string(),
});

export default function QuickAdd({ collections, shared }: Props) {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      collection_id: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          action={async (formData: FormData) => {
            try {
              const result = await insertItem(formData)
                .then((result) => {
                  console.log("result is", result);
                  const collection = collections.filter(
                    (x) => x.id == result?.data?.collection_id
                  );
                  console.log("collection is", collection);
                  toast.success("New Item Added", {
                    description: (
                      <div>
                        {result?.data?.title} in{" "}
                        <Link
                          href={`/collections/${result?.data?.collection_id}`}
                        >
                          {collection[0].name}
                        </Link>
                      </div>
                    ),
                    action: {
                      label: "View",
                      onClick: () =>
                        router.push(
                          `/collections/${result?.data?.collection_id}/${result?.data.id}`
                        ),
                    },
                  });
                  form.resetField("title");
                })
                .catch((error) => {
                  console.error(error);
                });
            } catch (e: unknown) {
              console.error(e);
            }
          }}
          //  onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
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

                  <Select onValueChange={field.onChange} {...field}>
                    <FormControl>
                      <>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/* <SelectLabel>Boards</SelectLabel> */}
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

{
  /* <div className="bg-slate-900 mb-8 p-4">
<form action={insertItem}>
  <Input placeholder="Title..." type="text" name="title" />
  <select name="collection_id" id="collection_id">
    {collections?.map((item, i) => (
      <option key={i} value={item.id}>
        {item.name}
      </option>
    ))}
  </select>
  <button type="submit" className="block p-2 mt-4">
    {" "}
    Add New Item
  </button>
</form>
</div> */
}

// {1 > 2 ? (
//   <FormField
//     control={form.control}
//     name="collection_id"
//     defaultValue={collections[0].id}
//     render={({ field }) => (
//       <FormItem>
//         <FormLabel>Title</FormLabel>
//         <FormControl>
//           <Input
//             placeholder="Title..."
//             readOnly
//             value={collections[0].id}
//           />
//         </FormControl>

//         <FormMessage />
//       </FormItem>
//     )}
//   />
// ) : null}
