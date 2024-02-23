'use client'
import React from "react";

type Props = {
  params: {
    collectionId: string;
    itemId: string;
  };
};

function ItemPageNormal({ params }: Props) {
  return (
    <div className='container'>
      Normal Item Page Route
      <div className="bg-muted p-8 rounded-xl">
        <code>
          /[collectionId]
          <br />
          -/[itemId]
          <br />
          -- page.tsx
          <br />
        </code>
      </div>
    </div>
  );
}

export default ItemPageNormal;
