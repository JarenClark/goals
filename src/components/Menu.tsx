"use client";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import {
  HomeIcon,
  PlusCircleIcon,
  FilesIcon,
  Building2Icon,
  BarChart2Icon,
  UsersIcon,
  GoalIcon,
  ListChecks,
  TagIcon,
  StickyNoteIcon,
  LibraryIcon,
  SettingsIcon,
  PersonStandingIcon,
  UserIcon,
  TableIcon,
  FolderIcon,
  OrbitIcon,
  BoxesIcon,
  PlusIcon
} from "lucide-react";

import { useCollectionStore, useUIstore } from "@/store";
import MenuItem from "./MenuItem";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MenuItemDropdown from "./MenuItemDropdown";
export default function Menu() {
  const { collections, setCollections } = useCollectionStore();
  useEffect(() => {
    if (collections == null) {
      console.log("collections == null");
      setCollections();
    }
  }, [collections]);

  const navIcons = [
    // {
    //   link: "/",
    //   icon: <HomeIcon className="w-5 h-5" />,
    //   label: "Home",
    // },

    {
      link: "/labels",
      icon: <TagIcon className="w-5 h-5" />,
      label: "Labels",
    },
    // {
    //   link: "/settings",
    //   icon: <SettingsIcon className="w-5 h-5" />,
    //   label: "Settings",
    // },
    // {
    //   link: "/profile",
    //   icon: <UserIcon className="w-5 h-5" />,
    //   label: "Profile",
    // },
    // {
    //   link: "/collections",
    //   icon: <OrbitIcon className="w-5 h-5" />,
    //   label: "Collections",
    //   childItems: collections ? collections : null,
    // },
  ];
  // if (!user) return null;
  return (
    <ul className="flex flex-col space-y-1">
      <MenuItem
        link={"/"}
        icon={<HomeIcon className="w-5 h-5" />}
        label={"Home"}
      />
      {navIcons.map((item, i) => (
        <React.Fragment key={i}>
          {item.childItems ? (
            <MenuItemDropdown {...item} />
          ) : (
            <MenuItem {...item} />
          )}
        </React.Fragment>
      ))}
      <li className="border-t py-2">
        <div className="flex justify-between">
          <div className="mb-2 text-muted-foreground flex items-center space-x-2">
            <BoxesIcon className="w-5 h-5" />
            <Label>Collections</Label>
          </div>
          <button className="text-muted-foreground hover:text-white hover:bg-muted flex items-center space-x-1 rounded-full pl-1 pr-3 p-1">
            <PlusIcon className="w-4 h-4"></PlusIcon>
            <Label className="text-[12px]">New</Label>
          </button>
        </div>
        <ul className="pl-5">
          <li>
            {collections?.map((c, i) => (
              <Link href={`/collections/${c.id}`}>
                <div className="flex py-1">
                  <Label className="text-muted-foreground hover:text-white">{c.name}</Label>
                </div>
              </Link>
            ))}
          </li>
        </ul>
      </li>
    </ul>
  );
}

// {
//   link: "/projects",
//   icon: <GoalIcon />,
//   label: "Projects",
// },
// {
//   link: "/tasks",
//   icon: <ListChecks />,
//   label: "Tasks",
// },
// {
//   link: "/categories",
//   icon: <TagIcon />,
//   label: "Categories",
// },
// {
//   link: "/notes",
//   icon: <StickyNoteIcon />,
//   label: "Notes",
// },
// {
//   link: "/users",
//   icon: <UsersIcon />,
//   label: "Social",
// },
// {
//   link: "/reports",
//   icon: <BarChart2Icon />,
//   label: "Reports",
// },

// {navIcons.map((item, i) => (
//     <li key={i}>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <div className="flex items-center space-x-2">
//               <Link
//                 href={item.link}
//                 className="flex items-center space-x-2"
//               >
//                 <>{item.icon}</>

//                 <span>{item.tooltip}</span>
//               </Link>
//             </div>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>{item.tooltip}</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>
//     </li>
//   ))}
