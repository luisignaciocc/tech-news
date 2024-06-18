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
          <TableHead className="w-1/3 px-4">Descripción</TableHead>
          <TableHead className="w-1/6 text-center">Buttons</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium px-4">{item.title}</TableCell>
              <TableCell className="font-medium px-4">
                {item.deletionReason}
              </TableCell>
              <TableCell className="text-right px-4">
                <div className="flex justify-end space-x-2">
                  <button>Botón 1</button>
                  <button>Botón 2</button>
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
