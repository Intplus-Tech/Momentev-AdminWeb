"use client";

import { useState } from "react";
import { ServiceCategory, PaginatedServiceCategories } from "@/types/serviceCategory";
import CategoryFormModal from "./CategoryFormModal";
import DeleteCategoryDialog from "./DeleteCategoryDialog";

interface CategoryTableProps {
  initialData: PaginatedServiceCategories;
}

export default function CategoryTable({ initialData }: CategoryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <button
        className="px-4 py-2 bg-black text-white rounded hover:opacity-90"
        onClick={handleAdd}
      >
        Add Category
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Icon</th>
            <th className="p-2">Tags</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {initialData.data.map((cat) => (
            <tr key={cat._id} className="border-t">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">{cat.icon}</td>
              <td className="p-2 text-sm">{cat.suggestedTags.join(", ")}</td>
              <td className="p-2 flex gap-3">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </button>
                <DeleteCategoryDialog categoryId={cat._id} categoryName={cat.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CategoryFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        onSuccess={() => {
          // Optional: refresh table or trigger parent update
        }}
      />
    </div>
  );
}
