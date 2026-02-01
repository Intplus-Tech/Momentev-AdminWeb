"use client";

import { useState, useTransition } from "react";
import { deleteServiceCategory } from "@/lib/actions/serviceCategories";

interface DeleteCategoryDialogProps {
  categoryId: string;
  categoryName: string;
}

export default function DeleteCategoryDialog({
  categoryId,
  categoryName,
}: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleDelete = () => {
    setError("");
    startTransition(async () => {
      const result = await deleteServiceCategory(categoryId);

      if (!result.success) {
        setError(result.error || "Failed to delete");
        return;
      }

      setOpen(false);
    });
  };

  return (
    <>
      {/* Delete button (unchanged UI) */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full">
          <div className="border p-3 rounded bg-white space-y-2 w-full max-w-sm mx-4">
            <div className="text-black flex items-center justify-center text-[19px] font-  bold">Delete Category</div>
            <p className="text-sm flex items-center justify-center">
              Are you sure you want to delete{" "}
              <strong>{categoryName}</strong>?
            </p>


            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                {isPending ? "Deleting..." : "Confirm"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
