"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
      >
        {label}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-56 bg-white border rounded-lg shadow-md p-3 space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="accent-blue-600"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
