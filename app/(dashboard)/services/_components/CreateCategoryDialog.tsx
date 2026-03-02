"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPicker } from "@/components/ui/icon-picker";
import { TagInput } from "@/components/ui/tag-input";
import { createServiceCategory } from "@/lib/actions/categories";

export function CreateCategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    setError("");
    if (!name.trim() || !icon) {
      setError("Name and Icon are required.");
      return;
    }

    setIsSubmitting(true);
    const result = await createServiceCategory({
      name: name.trim(),
      icon,
      suggestedTags,
    });
    
    setIsSubmitting(false);

    if (result.success) {
      setIsOpen(false);
      // Reset form
      setName("");
      setIcon("");
      setSuggestedTags([]);
    } else {
      setError(result.error || "Failed to create category");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#2B4EFF] hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Add a new service category that vendors can attach to their offerings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-sm font-medium pt-1">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Photography & Videography"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right text-sm font-medium">
              Icon
            </Label>
            <div className="col-span-3 flex">
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
                placeholder="Type a tag and press Enter" 
              />
              <p className="text-[11px] text-muted-foreground mt-1 text-left">
                Suggested tags help vendors discover relevant keywords.
              </p>
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-500 font-medium text-center bg-red-50 rounded-md p-2">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button 
             variant="outline" 
             onClick={() => setIsOpen(false)}
             disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
             onClick={handleCreate} 
             disabled={isSubmitting}
             className="bg-[#2B4EFF] hover:bg-blue-700 text-white"
          >
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
