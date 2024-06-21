import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface NotAprovedData {
  id: string;
  title: string;
}
interface DefaultTableProps {
  data: NotAprovedData[];
}

function NotAprovedTable({ data }: DefaultTableProps) {
  return (
    <Table className="mt-5">
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="px-4">
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="font-medium">{item.title}</p>
                  </div>
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

export default NotAprovedTable;
