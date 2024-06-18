"use client";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import { deleteNews } from "../utils/actions";

interface TableButtonsProps {
  newsId: string;
}

const handleDelete = async (newsId: string) => {
  try {
    const response = await deleteNews(newsId);
    if (response.success) {
      alert(response.message);
    } else {
      alert(response.message);
    }
  } catch (error) {
    alert(
      "Ocurrió un error al eliminar la noticia. Por favor, inténtalo de nuevo más tarde.",
    );
  }
};

function TableButtons({ newsId }: TableButtonsProps) {
  return (
    <div className="flex justify-end space-x-2">
      <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded">
        <FaCheckCircle />
      </button>
      <button
        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded"
        onClick={() => handleDelete(newsId)}
      >
        <FaTimesCircle />
      </button>
    </div>
  );
}

export default TableButtons;
