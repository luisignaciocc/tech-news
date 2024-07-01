import "react-loading-skeleton/dist/skeleton.css";

import { Fragment } from "react";
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
    <Fragment>
      <Skeleton width={150} height={40} className="mt-4" />
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 px-4">
              <Skeleton width={80} />
            </TableHead>
            <TableHead className="w-1/6">
              <Skeleton width={90} />
            </TableHead>
            <TableHead className="w-1/6 text-center">
              <Skeleton width={90} />
            </TableHead>
            <TableHead className="w-1/6 text-center">
              <Skeleton width={50} />
            </TableHead>
            <TableHead className="w-1/6 text-end">
              <Skeleton width={60} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="px-4">
                <Skeleton width={150} />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton width={150} />
              </TableCell>
              <TableCell className="text-center px-4">
                <Skeleton width={30} />
              </TableCell>
              <TableCell className="text-center px-4">
                <Skeleton width={60} height={25} />
              </TableCell>
              <TableCell className="text-right px-4">
                <div className="flex justify-end space-x-2">
                  <Skeleton width={25} height={25} />
                  <Skeleton width={25} height={25} />
                  <Skeleton width={25} height={25} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
