import React from "react";
import { Badge } from "../ui/badge";
type Props = { status: string };

function StatusBadge({ status }: Props) {
  if (status == "Normal") return null;

  const colorClassName = (status: string): string => {
    switch (status) {
      case "Sent to client":
        return "bg-[#2196f3] text-white";
      case "Approved":
        return "bg-[#4caf50] text-white";
      case "Revised":
        return "bg-[#1e354e] text-white";
      case "Rejected":
        return "bg-[#f44336] text-white";
      default:
        return "";
    }
  };

  return <Badge className={`${colorClassName(status)}`}>{status}</Badge>;
}

export default StatusBadge;
