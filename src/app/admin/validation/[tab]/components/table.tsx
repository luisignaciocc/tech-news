import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function DefaultTable() {
  return (
    <Table className="mt-5">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]" style={{ width: "30%" }}>
            Titulo
          </TableHead>
          <TableHead style={{ width: "40%" }}>Descripción</TableHead>
          <TableHead className="text-center" style={{ width: "10%" }}>
            Buttons
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium"></TableCell>
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
