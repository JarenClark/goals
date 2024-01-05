'use client'
import { useNotestore } from '@/store'
import React from 'react'

type Props = {}

function NoteEditor({}: Props) {
  const { note } = useNotestore()
    return (
    <div><pre>{JSON.stringify(note,null,2)}</pre></div>
  )
}

export default NoteEditor