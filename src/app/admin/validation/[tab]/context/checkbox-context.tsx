"use client";
import React, { createContext, useCallback, useState } from "react";

export const CheckboxContext = createContext<{
  selectedIds: string[];
  handleCheckboxChange: (id: string) => void;
}>({
  selectedIds: [],
  handleCheckboxChange: () => {},
});

export interface CheckboxProviderProps {
  children: React.ReactNode;
}

export const CheckboxProvider = ({ children }: CheckboxProviderProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckboxChange = useCallback((id: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }, []);

  return (
    <CheckboxContext.Provider value={{ selectedIds, handleCheckboxChange }}>
      {children}
    </CheckboxContext.Provider>
  );
};
