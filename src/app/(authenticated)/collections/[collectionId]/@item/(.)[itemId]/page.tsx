'use client'
import React from 'react'

type Props = {
    params: {
      collectionId: string;
      itemId: string;
    };
  };

function InterceptedItemPage({params}: Props) {
  return (
    <div className='container'>Intercepted Item Page Route hot reload
              <div className="bg-muted p-8 rounded-xl">
        <code>
        /[collectionId]<br/>
        -/@item<br/>
        --/(.)[itemId]<br/>
        --- page.tsx<br/>
        </code>
      </div>

    </div>
  )
}

export default InterceptedItemPage