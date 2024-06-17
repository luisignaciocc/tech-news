import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ToPublishData {
  id: string;
  title: string;
}
interface DefaultTableProps {
  data: ToPublishData[];
}

async function ToPublishTable({ data }: DefaultTableProps) {
  return (
    <Table className="mt-5">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]" style={{ width: "30%" }}>
            Titulo
          </TableHead>
          <TableHead className="text-center" style={{ width: "10%" }}>
            Buttons
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.title}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell className="text-right">
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

export default ToPublishTable;
