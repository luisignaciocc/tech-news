"use client";
import { useContext } from "react";

import { CheckboxContext } from "../../../context/checkbox-context";

export const CheckboxColumn = ({ id }: { id: string }) => {
  const { handleCheckboxChange, selectedIds } = useContext(CheckboxContext);
  const checked = selectedIds.includes(id);

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {
        handleCheckboxChange(id, !checked);
      }}
    />
  );
};
