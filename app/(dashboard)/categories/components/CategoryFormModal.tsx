"use client";

import { useState, useEffect, useTransition } from "react";
import { ServiceCategory } from "@/types/serviceCategory";
import { createServiceCategory, updateServiceCategory } from "@/lib/actions/serviceCategories";

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  category: ServiceCategory | null;
  onSuccess?: () => void;
}

export default function CategoryFormModal({
  open,
  onClose,
  category,
  onSuccess,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (!open) return; 


    const id = setTimeout(() => {
      setName(category?.name ?? "");
      setIcon(category?.icon ?? "");
      setTags(category?.suggestedTags.join(", ") ?? "");
      setError("");
    }, 0);

    return () => clearTimeout(id);
  }, [open, category]);

  const handleSubmit = () => {
    setError("");

    const payload = {
      name: name.trim(),
      icon: icon.trim(),
      suggestedTags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      try {
        const result = category
          ? await updateServiceCategory(category._id, payload)
          : await createServiceCategory(payload);

        if (!result.success) {
          setError(result.error || "Failed to save category");
          return;
        }

        onSuccess?.();
        onClose();
      } catch (err) {
        setError("Unexpected error occurred");
        console.error(err);
      }
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h2 className="text-lg font-semibold text-primary">{category ? "Edit Category" : "Add Category"}</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded text-primary" disabled={isPending}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
