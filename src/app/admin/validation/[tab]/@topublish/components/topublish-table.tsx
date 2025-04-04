"use client";
import { useContext } from "react";

import { CheckboxColumn } from "@/app/admin/components/checkbox-column";
import SelectAll from "@/app/admin/components/select-all";
import { CheckboxContext } from "@/app/admin/context/checkbox-context";
import ActionsButtons from "@/app/admin/validation/[tab]/components/actions-buttons";
import MassiveActionsButtons from "@/app/admin/validation/[tab]/components/massive-actions-buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  updateDeletedAtNotNull,
  updateDeletedAtNotNullMany,
  updateFilteredTrue,
  updateFilteredTrueMany,
} from "../utils/actions";

interface ToPublishData {
  id: string;
  title: string;
}
interface DefaultTableProps {
  data: ToPublishData[];
}

function ToPublishTable({ data }: DefaultTableProps) {
  const { selectedIds } = useContext(CheckboxContext);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">
            <SelectAll shownIds={data?.map((item) => item.id) || []} />
          </TableHead>
          <TableHead className="w-1/6 text-right">
            <MassiveActionsButtons
              newsIds={selectedIds}
              onUpdate={updateFilteredTrueMany}
              onDelete={updateDeletedAtNotNullMany}
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.title}>
              <TableCell className="font-medium px-4">
                <div className="flex items-center">
                  <CheckboxColumn id={item.id} />
                  <div className="ml-4">
                    <p className="font-medium">{item.title}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right px-4">
                <ActionsButtons
                  newsId={item.id}
                  onUpdate={updateFilteredTrue}
                  onDelete={updateDeletedAtNotNull}
                />
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

export default ToPublishTable;
