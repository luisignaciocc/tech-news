"use client";

const SelectAll: React.FC = () => {
  return (
    <div className="flex items-center justify-end">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
      />
      <span>Seleccionar todo</span>
    </div>
  );
};

export default SelectAll;
