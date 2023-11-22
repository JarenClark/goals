import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React, { useEffect, useState } from "react";

type Props = {
  old_id: string;
  italic: boolean;
};

function DisplayNameByOldID({ old_id, italic }: Props) {
  const supabase = createClientComponentClient();
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const getTodos = async () => {
      const { data: person, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("old_id", old_id)
        .single();

      console.log("error", error);
      if (person) {
        setName(person.full_name);
      }
    };

    getTodos();
  }, [supabase, setName]);

  if (!name || name == "") return null;
  return <div className={italic ? "italic" : ""}>{name}</div>;
}

export default DisplayNameByOldID;
