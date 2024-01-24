import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// type Props = {};
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
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BackButton from "./BackButton";
import Menu from "./Menu";
async function Sidebar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return (
    <div className="border-r min-w-[200px] pr-8">
      <nav className="">
        <Menu />
      </nav>
    </div>
  );
}

export default Sidebar;

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
