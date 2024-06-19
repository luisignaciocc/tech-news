"use client";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ActionsButtonsProps {
  newsId: string;
  onUpdate: (id: string) => Promise<{ success: boolean; message: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
}

function ActionsButtons({ newsId, onUpdate, onDelete }: ActionsButtonsProps) {
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const { success, message } = await onUpdate(newsId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const { success, message } = await onDelete(newsId);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    }
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

export default ActionsButtons;
