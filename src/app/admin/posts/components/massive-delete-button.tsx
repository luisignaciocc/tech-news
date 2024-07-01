"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

import { CheckboxContext } from "../../context/checkbox-context";

interface MassiveDeleteButtonProps {
  postsIds: string[];
  onDelete: (ids: string[]) => Promise<{ success: boolean; message: string }>;
}

function MassiveDeleteButton({ postsIds, onDelete }: MassiveDeleteButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { handleClearAll } = useContext(CheckboxContext);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const { success, message } = await onDelete(postsIds);
      if (success) {
        router.refresh();
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      handleClearAll();
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end space-x-2">
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

export default MassiveDeleteButton;