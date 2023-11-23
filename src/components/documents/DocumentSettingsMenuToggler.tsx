"use client";
import React from "react";
import { useDocumentStore } from "@/store";
import { SettingsIcon } from "lucide-react";
type Props = {};

function DocumentSettingsMenuToggler({}: Props) {
  const isOpen = useDocumentStore((state) => state.docMenuIsOpen);
  const toggle = useDocumentStore((state) => state.setDocMenuIsOpen);
  return (
    <button onClick={() => toggle(!isOpen)}>
      <SettingsIcon />
    </button>
  );
}

export default DocumentSettingsMenuToggler;
