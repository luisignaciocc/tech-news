"use client";
import React, { createContext, useState } from "react";

export const CheckboxContext = createContext<{
  selectedIds: string[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleSelectAll: (ids: string[], checked: boolean) => void;
  handleClearAll: () => void;
}>({
  selectedIds: [],
  handleCheckboxChange: () => {},
  handleSelectAll: () => {},
  handleClearAll: () => {},
});

export const CheckboxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const updateCheckbox = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id),
      );
    }
  };

  const handleSelectAll = (ids: string[], checked: boolean) => {
    if (checked) {
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  return (
    <CheckboxContext.Provider
      value={{
        selectedIds,
        handleCheckboxChange: updateCheckbox,
        handleSelectAll,
        handleClearAll,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
