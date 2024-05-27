"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSpaceStore } from "@/store";
import { useEffect } from "react";
import CollectionSelectNavigation from "./CollectionSelectNavigation";

type Space = {
  created_at: Date | string;
  id: string;
  name: string;
};
type Props = {
  //   spaces: Space[];
  currentSpace?: string;
};
export function SpaceNavigator({ currentSpace }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const router = useRouter();
  const params = useParams();

  const { spaces, space, setSpaces, setSpace } = useSpaceStore();
  useEffect(() => {
    if (params.organizationId) {
      setSpace(params.organizationId as string);
    }
    setSpaces();
  }, []);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value ? "there" : "Select Space..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            {spaces && spaces.length > 0 ? (
              <CommandGroup>
                {spaces?.map((spaceItem, i) => (
                  <CommandItem key={spaceItem.id} value={spaceItem.id}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === spaceItem.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {spaceItem.name}
                  </CommandItem>
                ))}

              </CommandGroup>
            ) : null}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CollectionSelectNavigation current=""/>
      {/* <p className="my-8">{JSON.stringify(spaces, null, 2)}</p> */}
    </>
  );
}