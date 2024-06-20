"use client";
import React, { createContext, useState } from "react";

interface Checkboxes {
  [key: string]: boolean;
}

export const CheckboxContext = createContext<{
  selectedIds: string[];
  handleCheckboxChange: (id: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  checkboxes: Checkboxes;
}>({
  selectedIds: [],
  handleCheckboxChange: () => {},
  handleSelectAll: () => {},
  checkboxes: {},
});

export const CheckboxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkboxes, setCheckboxes] = useState<Checkboxes>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const updateCheckbox = (id: string, checked: boolean) => {
    setCheckboxes((prevCheckboxes) => {
      if (prevCheckboxes[id] === checked) {
        return prevCheckboxes;
      }
      const newCheckboxes = {
        ...prevCheckboxes,
        [id]: checked,
      };
      setSelectedIds(
        Object.keys(newCheckboxes).filter((key) => newCheckboxes[key]),
      );
      return newCheckboxes;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = Object.keys(prevCheckboxes).reduce((acc, key) => {
        acc[key] = checked;
        return acc;
      }, {} as Checkboxes);
      setSelectedIds(
        Object.keys(newCheckboxes).filter((key) => newCheckboxes[key]),
      );
      return newCheckboxes;
    });
  };

  return (
    <CheckboxContext.Provider
      value={{
        selectedIds,
        handleCheckboxChange: updateCheckbox,
        handleSelectAll,
        checkboxes,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
