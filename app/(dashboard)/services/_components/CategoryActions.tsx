"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { IconPicker } from "@/components/ui/icon-picker";
import { TagInput } from "@/components/ui/tag-input";
import { Label } from "@/components/ui/label";
import { ManageSpecialtiesDialog } from "./ManageSpecialtiesDialog";
import { ServiceSpecialty } from "@/lib/actions/specialties";
import { Commission } from "@/lib/actions/commissions";
import { updateServiceCategory, deleteServiceCategory, ServiceCategory } from "@/lib/actions/categories";

// Simple custom toast hook substitution: since we could not find 'toast' in the app directory,
// we will rely on native alert or simple console/state feedback for now until a robust toast system is confirmed.
export function CategoryActions({
  category,
  initialSpecialties,
  commissions
}: {
  category: ServiceCategory;
  initialSpecialties: ServiceSpecialty[];
  commissions: Commission[];
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [name, setName] = useState(category.name);
  const [icon, setIcon] = useState(category.icon);
  const [suggestedTags, setSuggestedTags] = useState<string[]>(category.suggestedTags || []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    const result = await updateServiceCategory(category._id, {
      name,
      icon,
      suggestedTags,
    });

    setIsUpdating(false);

    if (result.success) {
      setIsEditDialogOpen(false);
      // alert("Category updated successfully!"); // Optional success feedback
    } else {
      alert(`Failed to update category: ${result.error}`);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteServiceCategory(category._id);
    setIsDeleting(false);

    if (result.success) {
      setIsDeleteDialogOpen(false);
    } else {
      alert(`Failed to delete category: ${result.error}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* EDIT DIALOG */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-[#2B4EFF] h-8 w-8">
            <Edit className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh-2rem)] p-4 sm:max-w-[560px] sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the service category here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:py-4">
            <div className="grid gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="name" className="text-left text-sm font-medium sm:text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 min-w-0 px-3 py-2 text-sm border rounded-md sm:col-span-3"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-4 sm:items-center sm:gap-4">
              <Label htmlFor="icon" className="text-left text-sm font-medium sm:text-right">
                Icon
              </Label>
              <div className="min-w-0 sm:col-span-3">
                <IconPicker
                  value={icon}
                  onChange={(val) => setIcon(val)}
                />
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-4 sm:items-start sm:gap-4">
              <Label htmlFor="tags" className="pt-0 text-left text-sm font-medium sm:pt-2 sm:text-right">
                Tags
              </Label>
              <div className="min-w-0 sm:col-span-3">
                <TagInput
                  tags={suggestedTags}
                  setTags={setSuggestedTags}
                  placeholder="wedding, photography..."
                />
                <p className="text-[11px] text-muted-foreground mt-1">Press enter or comma to add a tag</p>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:pt-2">
            <Button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="w-full bg-[#2B4EFF] text-white hover:bg-blue-700 sm:w-auto"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MANAGE SPECIALTIES */}
      <ManageSpecialtiesDialog
        category={category}
        initialSpecialties={initialSpecialties}
        commissions={commissions}
      />

      {/* DELETE ALERT DIALOG */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:text-red-500 h-8 w-8">
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              <strong> {category.name} </strong> category and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
