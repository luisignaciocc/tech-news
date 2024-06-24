"use client";
import React, { useContext } from "react";

import { CheckboxContext } from "../context/checkbox-context";

const SelectAll: React.FC<{ shownIds: string[] }> = ({ shownIds }) => {
  const { handleSelectAll, selectedIds } = useContext(CheckboxContext);
  const allChecked = shownIds.every((id) => selectedIds.includes(id));

  return (
    <div className="flex items-center justify-start">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
        checked={allChecked}
        onChange={() => {
          handleSelectAll(shownIds, !allChecked);
        }}
      />
      <span>Seleccionar todo</span>
    </div>
  );
};

export default SelectAll;
