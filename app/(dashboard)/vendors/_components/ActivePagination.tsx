"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";

interface ActivePaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function ActivePagination({ totalPages, currentPage }: ActivePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const navigateToPage = (page: number) => {
    router.push(`${pathname}?${createQueryString("page", page.toString())}`);
  };

  const handleNext = () => {
    if (currentPage < totalPages) navigateToPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) navigateToPage(currentPage - 1);
  };

  const isActive = (page: number) =>
    page === currentPage
      ? "bg-[#2B4EFF] text-white"
      : "text-[#757575] hover:text-[#2B4EFF]";

  // 🔹 Generate visible pages dynamically
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const windowSize = 1; // pages before & after current
    
    // If no pages needed, return empty
    if (totalPages <= 1) return pages;

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - windowSize);
      i <= Math.min(totalPages - 1, currentPage + windowSize);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-10 mt-8">
      {/* PREVIOUS */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-[#757575] disabled:opacity-40 hover:text-[#2B4EFF] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Previous</span>
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center space-x-2 sm:space-x-4 text-sm font-medium">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="text-[#757575] px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => navigateToPage(page as number)}
              className={`w-10 h-10 border rounded-lg transition-colors ${isActive(page as number)}`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* NEXT */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-[#757575] disabled:opacity-40 hover:text-[#2B4EFF] transition-colors"
      >
        <span className="text-sm font-medium">Next</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
