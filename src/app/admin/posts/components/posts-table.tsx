"use client";
import { useContext } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckboxColumn } from "../../components/checkbox-column";
import SelectAll from "../../components/select-all";
import { CheckboxContext } from "../../context/checkbox-context";
import {
  deletedPostUpdateNews,
  deletedPostUpdateNewsMany,
} from "../utils/actions";
import DeleteButton from "./delete-button";
import MassiveDeleteButton from "./massive-delete-button";

interface PostsData {
  id: string;
  title: string;
  coverImage: string;
  newId: string;
}

interface DefaultTableProps {
  data: PostsData[];
}

function PostsTable({ data }: DefaultTableProps) {
  const { selectedIds } = useContext(CheckboxContext);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3 px-4">
            <SelectAll shownIds={data?.map((item) => item.id) || []} />
          </TableHead>
          <TableHead className="w-1/6 text-end">
            <MassiveDeleteButton
              postsIds={selectedIds}
              onDelete={deletedPostUpdateNewsMany}
            />
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
                  <div className="ml-4 flex items-center">
                    <Image
                      src={item.coverImage}
                      alt=""
                      width={60}
                      height={60}
                      className="mr-4"
                    />
                    <span className="font-medium">{item.title}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right px-4">
                <DeleteButton
                  postId={item.id}
                  onDelete={deletedPostUpdateNews}
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
  );
}

export default PostsTable;
