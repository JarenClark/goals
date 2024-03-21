import ImageFromFolder from "@/components/ImageFromFolder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: {
    organizationId: string;
  };
};

export default async function MediaPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.storage
    .from("organization")
    .list(params.organizationId, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });
  return (
    <div className="container p-8">
      MediaPage
      <div className="flex flex-wrap -mx-4">
        {data?.map((item,i) => (

<div key={i} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-8">
<Card>
  <CardHeader>
    <CardTitle>Image</CardTitle>
  </CardHeader>
  <CardContent>
    {/* {JSON.stringify(item,null,2)} */}
    <ImageFromFolder name={item.name} folder={params.organizationId}/>
  </CardContent>
</Card>
</div>
        ))}

      </div>
      <br /> {JSON.stringify(params, null, 2)}
      <br />
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
