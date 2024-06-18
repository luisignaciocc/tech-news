"use client";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { handleDelete } from "../utils/actions";

interface TableButtonsProps {
  id: string;
}

function TableButtons({ id }: TableButtonsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded">
        <FaCheckCircle />
      </button>
      <button
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded"
        onClick={() => handleDelete(id)}
      >
        <FaTimesCircle />
      </button>
    </div>
  );
}

export default TableButtons;
