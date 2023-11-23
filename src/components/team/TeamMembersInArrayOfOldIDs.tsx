import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = { ids: string[] | null };

async function TeamMembersInArrayOfOldIDs({ ids }: Props) {
  if (!ids || ids.length == 0) {
    return <p>No Team Members Assigned</p>;
  }
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("members")
    .select("id, Name, Title")
    //.eq("id","5d3f5acdbb93c625ea71c798")
    .in("id", ids);
  console.log(error);
  return (
    <ul className="grid grid-cols-3 gap-6">
      {data
        ?.sort((a, b) => (a.Name > b.Name ? 1 : -1))
        .map((person, i) => (
          <li key={i}>{person.Name}</li>
        ))}
    </ul>
  );
}

export default TeamMembersInArrayOfOldIDs;
