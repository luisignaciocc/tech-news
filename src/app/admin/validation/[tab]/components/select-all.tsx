"use client";
import React, { useContext, useEffect, useState } from "react";

import { CheckboxContext } from "../context/checkbox-context";

const SelectAll: React.FC = () => {
  const { handleSelectAll, checkboxes } = useContext(CheckboxContext);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const allChecked = Object.values(checkboxes).every(Boolean);
    setAllChecked(allChecked);
  }, [checkboxes]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(event.target.checked);
  };

  return (
    <div className="flex items-center justify-start">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
        checked={allChecked}
        onChange={handleChange}
      />
      <span>Seleccionar todo</span>
    </div>
  );
};

export default SelectAll;
