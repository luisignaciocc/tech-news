"use client";
import { useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ActionsButtons from "../../components/actions-buttons";
import { CheckboxColumn } from "../../components/checkbox-column";
import MassiveActionsButtons from "../../components/massive-actions-buttons";
import SelectAll from "../../components/select-all";
import { CheckboxContext } from "../../context/checkbox-context";
import {
  deleteNews,
  deleteNewsMany,
  updateDeletedAtNull,
  updateDeletedAtNullMany,
} from "../utils/actions";

interface DeletedData {
  id: string;
  title: string;
  deletionReason: string;
}

interface DefaultTableProps {
  data: DeletedData[];
}

function DeletedTable({ data }: DefaultTableProps) {
  const { selectedIds } = useContext(CheckboxContext);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">
            <SelectAll />
          </TableHead>
          <TableHead className="w-1/6 text-end">
            <MassiveActionsButtons
              newsIds={selectedIds}
              onUpdate={updateDeletedAtNullMany}
              onDelete={deleteNewsMany}
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="px-4">
                <div className="flex items-center">
                  <CheckboxColumn id={item.id} />
                  <div className="ml-4">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600">{item.deletionReason}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right px-4">
                <ActionsButtons
                  newsId={item.id}
                  onUpdate={updateDeletedAtNull}
                  onDelete={deleteNews}
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

export default DeletedTable;
