import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Label } from "../ui/label";
import { USDollar } from "@/lib/utils";

type Props = { content: any[] };

function DeliverablesTable({ content }: Props) {
  if (!content) return null;
  const total = content
    .filter((x) => x.deliverable == true)
    .reduce((acc, curr) => acc + +curr.price + +curr.passThrough, 0);
  return (
    <div>
      <Table>
        <TableCaption>Total Spend: {USDollar.format(total)}</TableCaption>
        <TableHeader>
          <TableRow className="bg-[#fadec7] hover:bg-[#fadec7] dark:bg-[#f4511e] dark:hover:bg-[#f4511e]">
            {/* <TableHead></TableHead> */}
            <TableHead colSpan={4}>Deliverables</TableHead>
            <TableHead colSpan={1} align="right" className="text-right">
              Pass Through
            </TableHead>
            <TableHead colSpan={1} align="right" className="text-right">
              Direct Spend
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content
            .filter((x) => x.deliverable == true)
            .map((section, i) => (
              <TableRow key={i}>
                <TableHead scope="row">{i + 1}</TableHead>
                <TableCell colSpan={3} className="font-medium">
                  <ul className="flex flex-col">
                    <li>{section.title}</li>
                    {section.subsections &&
                      section.subsections.map(
                        (
                          sub: {
                            title:
                              | string
                              | number
                              | boolean
                              | React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | React.PromiseLikeOfReactNode
                              | null
                              | undefined;
                          },
                          j: React.Key | null | undefined
                        ) => <li key={j}>- {sub.title}</li>
                      )}
                  </ul>
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {section.passThrough && section.passThrough > 0
                    ? USDollar.format(section.passThrough)
                    : null}
                </TableCell>
                <TableCell colSpan={1} align="right">
                  {section.price && section.price > 0
                    ? USDollar.format(section.price)
                    : null}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
}

export default DeliverablesTable;
