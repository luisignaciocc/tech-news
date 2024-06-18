"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { updateDeletedAt, updateFiltered } from "../utils/actions";

interface TableButtonsProps {
  newsId: string;
}

function TableButtons({ newsId }: TableButtonsProps) {
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateFiltered(newsId);
      router.refresh();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await updateDeletedAt(newsId);
      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="flex justify-end space-x-2">
      <button
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded"
        onClick={() => handleUpdate()}
      >
        <FaCheckCircle />
      </button>
      <button
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded"
        onClick={() => handleDelete()}
      >
        <FaTimesCircle />
      </button>
    </div>
  );
}

export default TableButtons;
