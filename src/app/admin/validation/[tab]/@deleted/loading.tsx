import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">
            <Skeleton width={100} />
          </TableHead>
          <TableHead className="w-1/6 text-end">
            <Skeleton width={100} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium px-4">
              <Skeleton />
              <Skeleton width={200} />
            </TableCell>
            <TableCell className="text-right px-4">
              <div className="flex justify-end space-x-2">
                <Skeleton width={40} height={30} />
                <Skeleton width={40} height={30} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
