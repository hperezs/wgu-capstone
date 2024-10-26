import { titleCaseString } from "@/lib/helpers";
import { SongOrderChoice } from "@/lib/types/SongSelection";
import React from "react";

export interface DropdownProps {
  value: string;
  onChange: (value: SongOrderChoice) => void;
  options: string[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SongOrderChoice)}
      className="px-2 py-3 bg-zinc-900 border rounded border-zinc-700 focus:outline-none focus:ring focus:ring-emerald-900"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {titleCaseString(option)}
        </option>
      ))}
    </select>
  );
};
