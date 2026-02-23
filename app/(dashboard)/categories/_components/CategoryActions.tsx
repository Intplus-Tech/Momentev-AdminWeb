"use client";

import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
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
import { updateServiceCategory, deleteServiceCategory, ServiceCategory } from "@/lib/actions/categories";

// Simple custom toast hook substitution: since we could not find 'toast' in the app directory,
// we will rely on native alert or simple console/state feedback for now until a robust toast system is confirmed.
export function CategoryActions({ 
  category, 
  initialSpecialties 
}: { 
  category: ServiceCategory;
  initialSpecialties: ServiceSpecialty[];
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the service category here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3 h-10 px-3 py-2 text-sm border rounded-md"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right text-sm font-medium">
                Icon
              </Label>
              <div className="col-span-3">
                <IconPicker 
                  value={icon} 
                  onChange={(val) => setIcon(val)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="tags" className="text-right text-sm font-medium pt-2">
                Tags
              </Label>
              <div className="col-span-3">
                <TagInput 
                  tags={suggestedTags} 
                  setTags={setSuggestedTags} 
                  placeholder="wedding, photography..." 
                />
                <p className="text-[11px] text-muted-foreground mt-1">Press enter or comma to add a tag</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
               onClick={handleUpdate} 
               disabled={isUpdating}
               className="bg-[#2B4EFF] hover:bg-blue-700 text-white"
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
