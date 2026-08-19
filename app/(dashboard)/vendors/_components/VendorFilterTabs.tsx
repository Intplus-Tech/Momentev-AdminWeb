"use client";

import { useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface VendorFilterTabsProps {
  currentFilter: string;
  allCountLabel: string;
  activeCountLabel: string;
  inactiveCountLabel: string;
}

export default function VendorFilterTabs({
  currentFilter,
  allCountLabel,
  activeCountLabel,
  inactiveCountLabel,
}: VendorFilterTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterClick = (filter: string) => {
    if (filter === currentFilter || isPending) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    // Optionally reset page to 1 when changing filters
    params.delete("page"); 

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-6 sm:gap-10 text-[13px] bg-[#D9D9D9] p-2 rounded-lg min-w-max">
      <button
        onClick={() => handleFilterClick("All")}
        disabled={isPending}
        className={`font-medium p-1 px-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
          currentFilter === "All" ? "text-[#2B4EFF] bg-white" : "text-[#718096] hover:bg-gray-300"
        } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span>All <span className="pl-3">{allCountLabel}</span></span>
        {isPending && currentFilter !== "All" && <span className="text-xs opacity-60">...</span>}
      </button>

      <button
        onClick={() => handleFilterClick("Active")}
        disabled={isPending}
        className={`font-medium p-1 px-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
          currentFilter === "Active" ? "text-[#2B4EFF] bg-white" : "text-[#718096] hover:bg-gray-300"
        } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span>Active {activeCountLabel}</span>
        {isPending && currentFilter !== "Active" && <span className="text-xs opacity-60">...</span>}
      </button>

      <button
        onClick={() => handleFilterClick("Inactive")}
        disabled={isPending}
        className={`font-medium p-1 px-2 rounded-lg cursor-pointer flex items-center gap-2 transition-colors ${
          currentFilter === "Inactive" ? "text-[#2B4EFF] bg-white" : "text-[#718096] hover:bg-gray-300"
        } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        <span>Inactive/Suspended {inactiveCountLabel}</span>
        {isPending && currentFilter !== "Inactive" && <span className="text-xs opacity-60">...</span>}
      </button>
    </div>
  );
}
