"use client";
import { useContext, useEffect, useState } from "react";

import { CheckboxContext } from "../context/checkbox-context";

export const CheckboxColumn = ({ id }: { id: string }) => {
  const { checkboxes, handleCheckboxChange } = useContext(CheckboxContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (id in checkboxes) {
      setChecked(checkboxes[id]);
    } else {
      handleCheckboxChange(id, false);
    }
  }, [id, checkboxes, handleCheckboxChange]);

  const handleChange = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      handleCheckboxChange(id, newChecked);
      return newChecked;
    });
  };

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
};
