import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function DeletedTable() {
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
        <TableRow>
          <TableCell className="font-medium px-4">Title</TableCell>
          <TableCell className="font-medium px-4">Description</TableCell>
          <TableCell className="text-right px-4">
            <div className="flex justify-end space-x-2">
              <button>Botón 1</button>
              <button>Botón 2</button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default DeletedTable;
