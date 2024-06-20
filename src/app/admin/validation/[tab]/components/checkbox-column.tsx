"use client";
import { useContext, useEffect, useRef } from "react";

import { CheckboxContext } from "../context/checkbox-context";

export const CheckboxColumn = ({ id }: { id: string }) => {
  const { checkboxes, handleCheckboxChange } = useContext(CheckboxContext);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!(id in checkboxes)) {
      handleCheckboxChange(id, false);
    }
    checkedRef.current = checkboxes[id] ?? false;
  }, [id, checkboxes, handleCheckboxChange]);

  const checked = checkedRef.current;

  const handleChange = () => {
    checkedRef.current = !checked;
    handleCheckboxChange(id, checkedRef.current);
  };

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
};
