"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteSource } from "../utils/actions";
import ActionsButtons from "./actions-buttons";

interface SourcesData {
  id: number;
  name: string;
  lastUpdateAt: Date;
  isActive: boolean;
  newsCount: number;
}

interface NewsSourceWithCount {
  id: number;
  newsCount: number;
}

function SourcesTable({
  data,
  newsCount,
}: {
  data: SourcesData[];
  newsCount: NewsSourceWithCount[];
}) {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">Title</TableHead>
          <TableHead className="w-1/6">Last Update</TableHead>
          <TableHead className="w-1/6 text-center">News Count</TableHead>
          <TableHead className="w-1/6 text-center">Active</TableHead>
          <TableHead className="w-1/6 text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="px-4">
                <div className="flex items-center">
                  <div className="ml-4 flex items-center">
                    <span className="font-medium">{item.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4">
                {item.lastUpdateAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-center px-4">
                {newsCount[index].newsCount}
              </TableCell>
              <TableCell className="text-center px-4">
                {item.isActive ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-md">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md">
                    Inactive
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right px-4">
                <ActionsButtons sourceId={item.id} onDelete={deleteSource} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              No hay datos para mostrar
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default SourcesTable;
