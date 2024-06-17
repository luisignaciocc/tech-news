import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getToPublishData } from "../@topublish/utils/prisma";

interface DefaultTableProps {
  tab: string;
  page: number;
}

interface ToPublishDataResponse {
  data: ToPublishData[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

interface ToPublishData {
  id: string;
  title: string;
}

async function DefaultTable({ tab, page }: DefaultTableProps) {
  let response: ToPublishDataResponse = {
    data: [],
    totalCount: 0,
    currentPage: 0,
    totalPages: 0,
  };

  if (tab === "topublish") {
    response = await getToPublishData(page, 2);
  }

  return (
    <Table className="mt-5">
      <TableCaption>A list of your recent invoices, page: {page}.</TableCaption>
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
        {response.data.map((item) => (
          <TableRow key={item.title}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>Description</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <button>Botón 1</button>
                <button>Botón 2</button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DefaultTable;
