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
      <button onClick={() => handleUpdate()}>
        <FaCheckCircle
          className="text-green-500 hover:text-green-600"
          size={24}
        />
      </button>
      <button onClick={() => handleDelete()}>
        <FaTimesCircle className="text-red-500 hover:text-red-600" size={24} />
      </button>
    </div>
  );
}

export default TableButtons;
