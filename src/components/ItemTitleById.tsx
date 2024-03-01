'use server'
import React from "react";
import { headers, cookies } from "next/headers";
type Props = { id?: string };

function ItemTitleById({ id }: Props) {
    const headersList = headers()
    const referer = headersList.get('x-url')

    // const headers = headers()
  //if (!id) return null;
  return <div>{JSON.stringify(referer,null,2)}</div>;
}

export default ItemTitleById;
