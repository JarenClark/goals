"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import format from "date-fns/format";
import { useDocumentStore } from "@/store";

type Props = { docId: string };

function PaymentSchedule({ docId }: Props) {
  const [payments, setPayments] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const doc = useDocumentStore((state) => state.document);
  const { setDocument } = useDocumentStore();
  useEffect(() => {
    setDocument(docId);
    setStartDate(doc.start_date as Date);
    setEndDate(doc.rest?.endDate as Date);
    console.log("end date is", doc.endDate);
  }, []);
  return (
    <>
      <div className="flex items-end space-x-1">
        {/* START */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? (
                format(new Date(startDate), "MM/dd/yyyy")
              ) : (
                <span>Start Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {/* END */}
        {/* @wei not sure if this is necessary if we have the other two fields */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? (
                format(new Date(endDate), "MM/dd/yyyy")
              ) : (
                <span>End Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div>
          <Input
            type="number"
            defaultValue={doc.rest?.paymentSplit ?? undefined}
            placeholder="# of Payments"
          />
        </div>
      </div>
    </>
  );
}

export default PaymentSchedule;
