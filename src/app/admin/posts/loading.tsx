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
          <TableHead className="w-1/3 px-4 flex items-center">
            <Skeleton width={15} className="mr-2" />
            <Skeleton width={120} />
          </TableHead>
          <TableHead className="w-1/6 text-right">
            <div className="flex justify-end space-x-2">
              <Skeleton width={25} height={25} />
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium px-4 flex items-center">
              <div className="flex items-center">
                <Skeleton className="mr-4" width={15} />
                <div className="flex items-center">
                  <Skeleton width={60} height={40} className="mr-4" />
                  <Skeleton width={800} />
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right px-4">
              <div className="flex justify-end space-x-2">
                <Skeleton width={25} height={25} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
