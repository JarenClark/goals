"use client";
import React from "react";
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
} from "lucide-react";

import { useUIstore } from "@/store";
import MenuItem from "./MenuItem";
export default function Menu() {
  // const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

 // const closeSideNav = useUIstore((state) => state.closeSideNav);

  const navIcons = [
    {
      link: "/",
      icon: <HomeIcon />,
      label: "Dashboard",
    },
    {
      link: "/collections",
      icon: <LibraryIcon />,
      label: "Collections",
    },
    {
      link: "/labels",
      icon: <TagIcon />,
      label: "Labels",
    },
    {
      link: "/settings",
      icon: <SettingsIcon />,
      label: "Settings",
    },
    {
      link: "/profile",
      icon: <UserIcon />,
      label: "Profile",
    },
 
  ];
  // if (!user) return null;
  return (
    <ul className="flex flex-col space-y-2">
      {navIcons.map((item, i) => (
        <MenuItem key={i} {...item} />
      ))}
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
