"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Check, X, Tags } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Field, FieldError } from "@/components/ui/field";
import { ServiceCategory } from "@/lib/actions/categories";
import { Commission } from "@/lib/actions/commissions";
import { 
  ServiceSpecialty, 
  updateServiceSpecialty, 
  deleteServiceSpecialty,
  createServiceSpecialty
} from "@/lib/actions/specialties";

const specialtySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  commissionId: z.string().min(1, "Commission is required").refine(val => val !== "none", "Commission selection is required"),
});
type SpecialtyFormValues = z.infer<typeof specialtySchema>;

interface ManageSpecialtiesDialogProps {
  category: ServiceCategory;
  initialSpecialties: ServiceSpecialty[];
  commissions: Commission[];
}

export function ManageSpecialtiesDialog({ category, initialSpecialties, commissions }: ManageSpecialtiesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [specialties, setSpecialties] = useState<ServiceSpecialty[]>(initialSpecialties);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Delete state
  const [specialtyToDelete, setSpecialtyToDelete] = useState<{ id: string, name: string } | null>(null);

  // Sync state if initialProps change while open
  useEffect(() => {
    setSpecialties(initialSpecialties);
  }, [initialSpecialties]);

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: string, values: SpecialtyFormValues) => {
    setIsProcessing(true);
    
    const result = await updateServiceSpecialty(id, { 
      name: values.name.trim(),
      description: values.description.trim(),
      commissionId: values.commissionId 
    });
    
    setIsProcessing(false);
    if (result.success && result.data) {
      setSpecialties(prev => prev.map(s => s._id === id ? result.data! : s));
      setEditingId(null);
      return { success: true };
    } else {
      return { success: false, error: result.error };
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

  const handleCreate = async (values: SpecialtyFormValues) => {
    setIsProcessing(true);

    const result = await createServiceSpecialty({
      serviceCategoryId: category._id,
      name: values.name.trim(),
      description: values.description.trim(),
      commissionId: values.commissionId,
    });

    console.log('Create Specialty Response:', result);

    setIsProcessing(false);
    if (result.success && result.data) {
      setSpecialties(prev => [...prev, result.data!]);
      return { success: true };
    } else {
      return { success: false, error: result.error };
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
                    <EditSpecialtyRow 
                      specialty={spec}
                      commissions={commissions}
                      isProcessing={isProcessing}
                      onSave={handleUpdate}
                      onCancel={cancelEdit}
                    />
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
                          onClick={() => setEditingId(spec._id)}
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
        <CreateSpecialtyForm 
          category={category}
          commissions={commissions}
          isProcessing={isProcessing}
          onCreate={handleCreate}
        />
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

function EditSpecialtyRow({ 
  specialty, 
  commissions, 
  onSave, 
  onCancel, 
  isProcessing 
}: { 
  specialty: ServiceSpecialty;
  commissions: Commission[];
  onSave: (id: string, values: SpecialtyFormValues) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
  isProcessing: boolean;
}) {
  const form = useForm<SpecialtyFormValues>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: specialty.name,
      description: specialty.description || "",
      commissionId: specialty.commissionId || "none",
    },
  });

  const onSubmit = async (values: SpecialtyFormValues) => {
    const result = await onSave(specialty._id, values);
    if (result.error) {
      form.setError("root", { message: result.error });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-2 pr-2">
      <div className="flex gap-2 items-start">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field className="flex-1 gap-1" data-invalid={fieldState.invalid}>
              <Input 
                {...field}
                className="h-8 text-sm"
                placeholder="Specialty Name"
                autoFocus
              />
              <FieldError errors={[fieldState.error]} className="text-[10px]" />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="commissionId"
          render={({ field, fieldState }) => (
            <Field className="shrink-0 w-auto gap-1" data-invalid={fieldState.invalid}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-8 text-xs w-[130px]">
                  <SelectValue placeholder="Commission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>Select Commission</SelectItem>
                  {commissions.map(c => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.type === 'percentage' ? `${c.amount}%` : `${c.amount} ${c.currency}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} className="text-[10px]" />
            </Field>
          )}
        />
        <Button 
          type="submit"
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-green-600 hover:bg-green-100 hover:text-green-700 shrink-0"
          disabled={isProcessing}
        >
          <Check className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-gray-500 hover:bg-gray-200 shrink-0"
          onClick={onCancel}
          disabled={isProcessing}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field className="gap-1" data-invalid={fieldState.invalid}>
            <textarea
              {...field}
              className="w-full text-sm rounded-md border border-input bg-transparent px-3 py-1 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]"
              placeholder="Description (At least 10 characters)"
            />
            <FieldError errors={[fieldState.error]} className="text-[10px]" />
          </Field>
        )}
      />
      {form.formState.errors.root && (
        <div className="text-[11px] text-destructive mt-1 font-medium bg-destructive/10 p-2 rounded-md">
          {form.formState.errors.root.message}
        </div>
      )}
    </form>
  );
}

function CreateSpecialtyForm({ 
  category, 
  commissions, 
  isProcessing,
  onCreate 
}: { 
  category: ServiceCategory; 
  commissions: Commission[]; 
  isProcessing: boolean;
  onCreate: (values: SpecialtyFormValues) => Promise<{ success: boolean; error?: string }>;
}) {
  const form = useForm<SpecialtyFormValues>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: "",
      description: "",
      commissionId: "none",
    },
  });

  const onSubmit = async (values: SpecialtyFormValues) => {
    const result = await onCreate(values);
    if (result.success) {
      form.reset();
    } else if (result.error) {
      form.setError("root", { message: result.error });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field className="flex-1 gap-1" data-invalid={fieldState.invalid}>
              <Input 
                {...field}
                className="h-8 text-sm"
                placeholder="Add new specialty..."
              />
              <FieldError errors={[fieldState.error]} className="text-[10px]" />
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="commissionId"
          render={({ field, fieldState }) => (
            <Field className="shrink-0 w-auto gap-1" data-invalid={fieldState.invalid}>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-8 text-xs w-[130px]">
                  <SelectValue placeholder="Commission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>Select Commission</SelectItem>
                  {commissions.map(c => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.type === 'percentage' ? `${c.amount}%` : `${c.amount} ${c.currency}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} className="text-[10px]" />
            </Field>
          )}
        />
        <Button 
          type="submit"
          size="sm" 
          className="h-8 bg-[#2B4EFF] hover:bg-blue-700 text-white shrink-0"
          disabled={isProcessing}
        >
          Add
        </Button>
      </div>
      <Controller
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <Field className="gap-1" data-invalid={fieldState.invalid}>
            <textarea
              {...field}
              className="w-full text-sm rounded-md border border-input bg-transparent px-3 py-1 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]"
              placeholder="Description (At least 10 characters)"
            />
            <FieldError errors={[fieldState.error]} className="text-[10px]" />
          </Field>
        )}
      />
      {form.formState.errors.root && (
        <div className="text-[11px] text-destructive mt-1 font-medium bg-destructive/10 p-2 rounded-md">
          {form.formState.errors.root.message}
        </div>
      )}
    </form>
  );
}
