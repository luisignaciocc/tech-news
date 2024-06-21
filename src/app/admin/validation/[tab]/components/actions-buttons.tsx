"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ActionsButtonsProps {
  newsId: string;
  onUpdate: (id: string) => Promise<{ success: boolean; message: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
}

function ActionsButtons({ newsId, onUpdate, onDelete }: ActionsButtonsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const { success, message } = await onUpdate(newsId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { success, message } = await onDelete(newsId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end space-x-2">
      <button
        onClick={handleUpdate}
        disabled={isLoading}
        className={`${isLoading ? "text-gray-400 hover:text-gray-400" : "text-green-500 hover:text-green-600"}`}
      >
        <FaCheckCircle size={24} />
      </button>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className={`${isLoading ? "text-gray-400 hover:text-gray-400" : "text-red-500 hover:text-red-600"}`}
      >
        <FaTimesCircle size={24} />
      </button>
    </div>
  );
}

export default ActionsButtons;
