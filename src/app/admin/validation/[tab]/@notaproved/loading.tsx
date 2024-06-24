import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Loading() {
  return (
    <Table className="mt-5">
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium px-4">
              <Skeleton width={900} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
