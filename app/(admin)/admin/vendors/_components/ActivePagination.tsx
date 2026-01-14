"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ActivePagination() {
  const totalPages = 68
  const [currentPage, setCurrentPage] = useState(1)

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const isActive = (page: number) =>
    page === currentPage
      ? "bg-primary text-white"
      : "text-[#757575] hover:text-primary"

  // 🔹 Generate visible pages dynamically
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    const windowSize = 1 // pages before & after current

    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    for (
      let i = Math.max(2, currentPage - windowSize);
      i <= Math.min(totalPages - 1, currentPage + windowSize);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-10">

      {/* PREVIOUS */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2 text-[#757575] disabled:opacity-40"
      >
        <ArrowLeft />
        <span>Previous</span>
      </button>

      {/* PAGE NUMBERS */}
      <div className="flex items-center space-x-7">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="text-[#757575]"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`w-10 h-10 border rounded-lg ${isActive(page as number)}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* NEXT */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 text-[#757575] disabled:opacity-40"
      >
        <span>Next</span>
        <ArrowRight />
      </button>
    </div>
  )
}
