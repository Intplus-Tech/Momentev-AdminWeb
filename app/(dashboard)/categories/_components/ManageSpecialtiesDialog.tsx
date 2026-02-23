"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Check, X, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ServiceCategory } from "@/lib/actions/categories";
import { 
  ServiceSpecialty, 
  updateServiceSpecialty, 
  deleteServiceSpecialty 
} from "@/lib/actions/specialties";

interface ManageSpecialtiesDialogProps {
  category: ServiceCategory;
  initialSpecialties: ServiceSpecialty[];
}

export function ManageSpecialtiesDialog({ category, initialSpecialties }: ManageSpecialtiesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [specialties, setSpecialties] = useState<ServiceSpecialty[]>(initialSpecialties);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync state if initialProps change while open
  useEffect(() => {
    setSpecialties(initialSpecialties);
  }, [initialSpecialties]);

  const startEdit = (specialty: ServiceSpecialty) => {
    setEditingId(specialty._id);
    setEditName(specialty.name);
    setEditDescription(specialty.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setIsProcessing(true);
    
    // Optimistic UI update
    const previousState = [...specialties];
    setSpecialties(prev => prev.map(s => s._id === id ? { ...s, name: editName.trim(), description: editDescription.trim() } : s));
    
    const result = await updateServiceSpecialty(id, { 
      name: editName.trim(),
      description: editDescription.trim() 
    });
    
    setIsProcessing(false);
    if (result.success && result.data) {
      setEditingId(null);
    } else {
      // Revert optimism
      setSpecialties(previousState);
      alert(`Failed to update specialty: ${result.error}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the specialty "${name}"?`)) return;
    
    setIsProcessing(true);
    const previousState = [...specialties];
    setSpecialties(prev => prev.filter(s => s._id !== id)); // Optimistic UI
    
    const result = await deleteServiceSpecialty(id);
    
    setIsProcessing(false);
    if (!result.success) {
      setSpecialties(previousState);
      alert(`Failed to delete specialty: ${result.error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-amber-600 h-8 w-8" title="Manage Specialties">
          <Tags className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Specialties</DialogTitle>
          <DialogDescription>
            Edit or remove specialties assigned to the <strong>{category.name}</strong> category.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {specialties.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No specialties found for this category.
            </div>
          ) : (
            <ul className="space-y-2">
              {specialties.map((spec) => (
                <li 
                  key={spec._id}
                  className="flex items-center justify-between p-3 rounded-md border bg-gray-50/50"
                >
                  {editingId === spec._id ? (
                    // EDIT MODE
                    <div className="flex-1 flex flex-col gap-2 pr-2">
                      <div className="flex gap-2">
                        <Input 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8 text-sm flex-1"
                          placeholder="Specialty Name"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleUpdate(spec._id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-green-600 hover:bg-green-100 hover:text-green-700 shrink-0"
                          onClick={() => handleUpdate(spec._id)}
                          disabled={isProcessing}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-gray-500 hover:bg-gray-200 shrink-0"
                          onClick={cancelEdit}
                          disabled={isProcessing}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full text-sm rounded-md border border-input bg-transparent px-3 py-1 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]"
                        placeholder="Description (Optional)"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    </div>
                  ) : (
                    // VIEW MODE
                    <>
                      <div className="flex-1 overflow-hidden pr-4">
                        <div className="text-sm font-medium text-gray-900 truncate">{spec.name}</div>
                        {spec.description && (
                          <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                            {spec.description}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-gray-500 hover:text-[#2B4EFF] hover:bg-blue-50"
                          onClick={() => startEdit(spec)}
                          disabled={isProcessing || editingId !== null}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(spec._id, spec.name)}
                          disabled={isProcessing || editingId !== null}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
