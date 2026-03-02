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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ServiceCategory } from "@/lib/actions/categories";
import { Commission } from "@/lib/actions/commissions";
import { 
  ServiceSpecialty, 
  updateServiceSpecialty, 
  deleteServiceSpecialty,
  createServiceSpecialty
} from "@/lib/actions/specialties";

interface ManageSpecialtiesDialogProps {
  category: ServiceCategory;
  initialSpecialties: ServiceSpecialty[];
  commissions: Commission[];
}

export function ManageSpecialtiesDialog({ category, initialSpecialties, commissions }: ManageSpecialtiesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [specialties, setSpecialties] = useState<ServiceSpecialty[]>(initialSpecialties);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCommissionId, setEditCommissionId] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);

  // Create state
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCommissionId, setNewCommissionId] = useState<string | undefined>();

  // Delete state
  const [specialtyToDelete, setSpecialtyToDelete] = useState<{ id: string, name: string } | null>(null);

  // Sync state if initialProps change while open
  useEffect(() => {
    setSpecialties(initialSpecialties);
  }, [initialSpecialties]);

  const startEdit = (specialty: ServiceSpecialty) => {
    setEditingId(specialty._id);
    setEditName(specialty.name);
    setEditDescription(specialty.description || "");
    setEditCommissionId(specialty.commissionId);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setEditCommissionId(undefined);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    setIsProcessing(true);
    
    // Optimistic UI update
    const previousState = [...specialties];
    setSpecialties(prev => prev.map(s => s._id === id ? { 
      ...s, 
      name: editName.trim(), 
      description: editDescription.trim(),
      commissionId: editCommissionId
    } : s));
    
    const result = await updateServiceSpecialty(id, { 
      name: editName.trim(),
      description: editDescription.trim(),
      commissionId: editCommissionId 
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

  const confirmDelete = async () => {
    if (!specialtyToDelete) return;
    const { id } = specialtyToDelete;
    
    setIsProcessing(true);
    const previousState = [...specialties];
    setSpecialties(prev => prev.filter(s => s._id !== id)); // Optimistic UI
    
    const result = await deleteServiceSpecialty(id);
    
    setIsProcessing(false);
    setSpecialtyToDelete(null);

    if (!result.success) {
      setSpecialties(previousState);
      alert(`Failed to delete specialty: ${result.error}`);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setIsProcessing(true);

    const result = await createServiceSpecialty({
      serviceCategoryId: category._id,
      name: newName.trim(),
      description: newDescription.trim(),
      commissionId: newCommissionId,
    });

    setIsProcessing(false);
    if (result.success && result.data) {
      setSpecialties(prev => [...prev, result.data!]);
      setNewName("");
      setNewDescription("");
      setNewCommissionId(undefined);
    } else {
      alert(`Failed to create specialty: ${result.error}`);
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
                        <Select value={editCommissionId} onValueChange={setEditCommissionId}>
                          <SelectTrigger className="h-8 text-xs w-[130px] shrink-0">
                            <SelectValue placeholder="Commission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Commission</SelectItem>
                            {commissions.map(c => (
                              <SelectItem key={c._id} value={c._id}>
                                {c.type === 'percentage' ? `${c.amount}%` : `${c.amount} ${c.currency}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 truncate">{spec.name}</span>
                          {spec.commissionId && (() => {
                            const c = commissions.find(c => c._id === spec.commissionId);
                            if (c) {
                              return (
                                <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-sm font-medium">
                                  {c.type === 'percentage' ? `${c.amount}%` : `${c.amount} ${c.currency}`}
                                </span>
                              );
                            }
                            return null;
                          })()}
                        </div>
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
                          onClick={() => setSpecialtyToDelete({ id: spec._id, name: spec.name })}
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

        {/* CREATE SPECIALTY ROW */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-8 text-sm flex-1"
              placeholder="Add new specialty..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
            />
            <Select value={newCommissionId} onValueChange={setNewCommissionId}>
              <SelectTrigger className="h-8 text-xs w-[130px] shrink-0">
                <SelectValue placeholder="Commission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Commission</SelectItem>
                {commissions.map(c => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.type === 'percentage' ? `${c.amount}%` : `${c.amount} ${c.currency}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              size="sm" 
              className="h-8 bg-[#2B4EFF] hover:bg-blue-700 text-white shrink-0"
              onClick={handleCreate}
              disabled={isProcessing || !newName.trim()}
            >
              Add
            </Button>
          </div>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full text-sm rounded-md border border-input bg-transparent px-3 py-1 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]"
            placeholder="Description (Optional)"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) handleCreate();
            }}
          />
        </div>
      </DialogContent>

      <AlertDialog open={specialtyToDelete !== null} onOpenChange={(open) => !open && setSpecialtyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the specialty <strong>"{specialtyToDelete?.name}"</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isProcessing}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {isProcessing ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
