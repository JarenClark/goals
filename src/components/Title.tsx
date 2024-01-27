import React from 'react'
import Link from 'next/link';
type LinkItem = {
    link?: string;
    text: string
}
type Props = {
    linkItems: LinkItem[];
}

function Title({linkItems}: Props) {
  return (
    <ul className="flex space-x-2">
    {linkItems.map((item,i) => (
        <li key={i}></li>
    ))}
    </ul>
  )
}

export default Title