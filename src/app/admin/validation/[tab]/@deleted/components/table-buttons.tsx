"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { deleteNews, updateDeletedAt } from "../utils/actions";

interface TableButtonsProps {
  newsId: string;
}

function TableButtons({ newsId }: TableButtonsProps) {
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      await updateDeletedAt(newsId);
      router.refresh();
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await deleteNews(newsId);
      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="flex justify-end space-x-2">
      <button
        className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded"
        onClick={() => handleUpdate()}
      >
        <FaCheckCircle
          className="text-green-500 hover:text-green-600"
          size={24}
        />
      </button>
      <button
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded"
        onClick={() => handleDelete()}
      >
        <FaTimesCircle className="text-red-500 hover:text-red-600" size={24} />
      </button>
    </div>
  );
}

export default TableButtons;
