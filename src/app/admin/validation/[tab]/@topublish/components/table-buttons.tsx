"use client";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface TableButtonsProps {
  newsId: string;
}

function TableButtons({ newsId }: TableButtonsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <h1>{newsId}</h1>

      <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded">
        <FaCheckCircle />
      </button>
      <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded">
        <FaTimesCircle />
      </button>
    </div>
  );
}

export default TableButtons;
