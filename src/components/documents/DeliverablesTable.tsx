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

type Props = { content: any[] };

function DeliverablesTable({ content }: Props) {
  const total = content
    .filter((x) => x.deliverable == true)
    .reduce((acc, curr) => (acc + ( +curr.price) + ( + curr.passThrough)), 0);
  return (
    <div>
      <Table >
        <TableCaption>Total Spend: {total}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Deliverables</TableHead>
            <TableHead>Pass Through</TableHead>
            <TableHead>Direct Spend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content
            .filter((x) => x.deliverable == true)
            .map((section, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="border-r p-1 flex items-center">
                      {i + 1}
                    </div>
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
                  </div>
                </TableCell>
                <TableCell>
                  {section.passThrough && section.passThrough > 0
                    ? section.passThrough
                    : null}
                </TableCell>
                <TableCell>
                  {section.price && section.price > 0 ? section.price : null}
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
