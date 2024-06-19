"use client";
import React, { useCallback, useEffect, useState } from "react";

interface CheckboxColumnProps {
  id: string;
  isChecked?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
}

const CheckboxColumn: React.FC<CheckboxColumnProps> = ({
  id,
  isChecked = false,
  onSelectionChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleCheckboxChange = useCallback(() => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (newChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }

    if (onSelectionChange) {
      onSelectionChange(selectedIds);
    }
  }, [checked, id, onSelectionChange, selectedIds]);

  return (
    <div className="flex justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
  );
};

export default CheckboxColumn;
