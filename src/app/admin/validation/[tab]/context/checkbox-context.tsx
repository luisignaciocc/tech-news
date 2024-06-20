"use client";
import React, { createContext, useRef, useState } from "react";

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
  const checkboxesRef = useRef<Checkboxes>(checkboxes);

  const updateCheckbox = (id: string, checked: boolean) => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = {
        ...prevCheckboxes,
        [id]: checked,
      };
      checkboxesRef.current = newCheckboxes;
      printCheckboxes();
      return newCheckboxes;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = Object.keys(prevCheckboxes).reduce((acc, key) => {
        acc[key] = checked;
        return acc;
      }, {} as Checkboxes);
      checkboxesRef.current = newCheckboxes;
      printCheckboxes();
      return newCheckboxes;
    });
  };

  const printCheckboxes = () => {
    // console.log("Current Checkboxes State:", checkboxesRef.current);
  };

  return (
    <CheckboxContext.Provider
      value={{
        selectedIds: [],
        handleCheckboxChange: updateCheckbox,
        handleSelectAll,
        checkboxes: checkboxesRef.current,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
};
