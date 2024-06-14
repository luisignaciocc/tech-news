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
          <TableHead>Button 1</TableHead>
          <TableHead className="text-right">Button 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Button 1</TableCell>
          <TableCell className="text-right">Button 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default DefaultTable;
