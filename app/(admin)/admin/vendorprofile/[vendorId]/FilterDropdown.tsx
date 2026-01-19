"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  open: boolean;
  setOpenDropdown: (label: string | null) => void;
  hasSelection: boolean; // true if any option is selected
}

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  open,
  setOpenDropdown,
  hasSelection,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpenDropdown(open ? null : label)}
        className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${open || hasSelection
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border"
          }`}
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
