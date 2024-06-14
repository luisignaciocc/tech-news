import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DefaultTable() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Titulo</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="text-right">Buttons</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell className="text-right">
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

export default DefaultTable;
