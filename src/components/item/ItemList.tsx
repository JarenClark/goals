import React from 'react'

type Item = {
    id: string;
    title: string;
}
type Props = {
    items: Item[];
}

function ItemList({items}: Props) {
  return (
    <div>ItemList</div>
  )
}

export default ItemList