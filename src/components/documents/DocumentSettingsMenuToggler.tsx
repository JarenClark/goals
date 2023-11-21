"use client";
import React from "react";
import { useStore } from "@/store";
import { SettingsIcon } from "lucide-react";
type Props = {};

function DocumentSettingsMenuToggler({}: Props) {
  const isOpen = useStore((state) => state.docMenuIsOpen);
  const toggle = useStore((state) => state.setDocMenuIsOpen);
  return (
    <button onClick={() => toggle(!isOpen)}>
      <SettingsIcon />
    </button>
  );
}

export default DocumentSettingsMenuToggler;
