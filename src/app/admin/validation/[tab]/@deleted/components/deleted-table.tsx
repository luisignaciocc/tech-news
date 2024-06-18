import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">Titulo</TableHead>
          <TableHead className="w-1/6 text-end">Buttons</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium px-4">
                <p>{item.title}</p>
                <p className="text-gray-600">{item.deletionReason}</p>
              </TableCell>
              <TableCell className="text-right px-4">
                <div className="flex justify-end space-x-2">
                  <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded">
                    <FaCheckCircle />
                  </button>
                  <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded">
                    <FaTimesCircle />
                  </button>
                </div>
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
