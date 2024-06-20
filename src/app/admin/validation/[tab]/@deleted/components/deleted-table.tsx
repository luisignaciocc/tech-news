import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import CheckboxColumn from "../../../components/checkbox-column";
import ActionsButtons from "../../components/actions-buttons";
import { CheckboxProvider } from "../../context/checkbox-context";
import { deleteNews, updateDeletedAtNull } from "../utils/actions";

interface DeletedData {
  id: string;
  title: string;
  deletionReason: string;
}

interface DefaultTableProps {
  data: DeletedData[];
}

async function DeletedTable({ data }: DefaultTableProps) {
  return (
    <CheckboxProvider>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3 px-4">
              <div className="ml-7">Titulo</div>
            </TableHead>
            <TableHead className="w-1/6 text-end">
              <div className="flex items-center justify-end">
                <span>Acciones Masivas</span>
                <div className="ml-4 flex items-center">
                  <button className={"text-green-500 hover:text-green-600"}>
                    <FaCheckCircle size={24} />
                  </button>
                  <button className={"text-red-500 hover:text-red-600 ml-2"}>
                    <FaTimesCircle size={24} />
                  </button>
                </div>
              </div>
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
    </CheckboxProvider>
  );
}

export default DeletedTable;
