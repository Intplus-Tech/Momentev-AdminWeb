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

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="border p-3 rounded bg-red-50 space-y-2">
      <p className="text-sm">
        Are you sure you want to delete <strong>{categoryName}</strong>?
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-2">
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
  );
}
