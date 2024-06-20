"use client";
import { useContext } from "react";

import { CheckboxContext } from "../[tab]/context/checkbox-context";

interface CheckboxColumnProps {
  id: string;
}

const CheckboxColumn = ({ id }: CheckboxColumnProps) => {
  const { selectedIds, handleCheckboxChange } = useContext(CheckboxContext);

  const checked = selectedIds.includes(id);

  const handleChange = () => {
    handleCheckboxChange(id);
  };

  return (
    <div className="flex justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default CheckboxColumn;
