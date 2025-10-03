import React from "react";
import clsx from "clsx";

interface FilterButtonProps {
  title: string;
  isActive: boolean;
  handleFilterChange: (activeFilter: string) => void;
}

const FilterButton = (props: FilterButtonProps) => {
  const { title, isActive, handleFilterChange } = props;
  return (
    <button
      className={
        "text-sm px-4 py-2 leading-normal rounded-xl text-white hover:cursor-pointer hover:opacity-90" +
        clsx(" ", isActive ? "bg-blue-400" : "bg-blue-800")
      }
      onClick={() => handleFilterChange(title)}
    >
      {title}
    </button>
  );
};

export default React.memo(FilterButton);
