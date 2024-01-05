import ProtectedContent from "@/components/ProtectedContent";
import { TypographyH1, TypographyLead } from "@/components/ui/typography";
import React from "react";

export default async function ReportPage() {
  return (
    <>
      <ProtectedContent>
        <div className="container">
          <div className="mb-8">
            <div className="mb-2 flex justify-between items-center">
              <TypographyH1>Reports</TypographyH1>
            </div>
            <TypographyLead>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste
              sed non.
            </TypographyLead>
          </div>
        </div>
      </ProtectedContent>
    </>
  );
}
