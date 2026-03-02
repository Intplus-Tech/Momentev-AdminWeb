"use client";

import { useState, useTransition, useEffect } from "react";
import { 
  getCommissions, 
  createCommission, 
  updateCommission, 
  deleteCommission,
  Commission,
  PaginatedCommissionsResponse
} from "@/lib/actions/commissions";
import { Loader2, AlertCircle, Percent, Plus, Edit2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";

export default function CommissionsTable() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PaginatedCommissionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  // Form State
  const [formData, setFormData] = useState<{type: "flat_rate" | "percentage", amount: string, currency: string}>({
      type: "percentage",
      amount: "",
      currency: "NGN"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = () => {
    startTransition(async () => {
      setError(null);
      const result = await getCommissions(1, 100); // Fetch all for now or implement pagination
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load commissions");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
      setFormData({ type: "percentage", amount: "", currency: "NGN" });
      setIsAddModalOpen(true);
  };

  const handleOpenEdit = (commission: Commission) => {
      setSelectedCommission(commission);
      setFormData({
          type: commission.type,
          amount: commission.amount.toString(),
          currency: commission.currency || "NGN"
      });
      setIsEditModalOpen(true);
  };

  const handleOpenDelete = (commission: Commission) => {
      setSelectedCommission(commission);
      setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setIsDeleteModalOpen(false);
      setSelectedCommission(null);
  };

  const handleCreate = async () => {
      if (!formData.amount || isNaN(Number(formData.amount))) {
          toast.error("Please enter a valid amount");
          return;
      }
      setIsSubmitting(true);
      const res = await createCommission({
          type: formData.type,
          amount: Number(formData.amount),
          currency: formData.currency
      });
      setIsSubmitting(false);

      if (res.success) {
          toast.success("Commission created successfully");
          closeModal();
          fetchData();
      } else {
          toast.error(res.error || "Failed to create commission");
      }
  };

  const handleEdit = async () => {
    if (!selectedCommission || !formData.amount || isNaN(Number(formData.amount))) {
        toast.error("Please enter a valid amount");
        return;
    }
    setIsSubmitting(true);
    const res = await updateCommission(selectedCommission._id, {
        amount: Number(formData.amount),
        currency: formData.currency
    });
    setIsSubmitting(false);

    if (res.success) {
        toast.success("Commission updated successfully");
        closeModal();
        fetchData();
    } else {
        toast.error(res.error || "Failed to update commission");
    }
  };

  const handleDelete = async () => {
      if (!selectedCommission) return;
      setIsSubmitting(true);
      const res = await deleteCommission(selectedCommission._id);
      setIsSubmitting(false);

      if (res.success) {
        toast.success("Commission deleted successfully");
        closeModal();
        fetchData();
    } else {
        toast.error(res.error || "Failed to delete commission");
    }
  };

  const formatAmount = (commission: Commission) => {
      if (commission.type === "percentage") {
          return `${commission.amount}%`;
      }
      return commission.amount.toLocaleString("en-US", {
          style: "currency",
          currency: commission.currency || "NGN",
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
            <Percent className="h-5 w-5 text-blue-500" />
            Platform Commissions
            </h2>
            <p className="text-sm text-gray-500">
            Manage the commissions charged to vendors.
            </p>
        </div>
        <Button onClick={handleOpenAdd} size="sm" className="bg-[#2B4EFF] hover:bg-[#1f3de0] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Commission
        </Button>
      </div>

      <div className="overflow-x-auto relative min-h-[200px]">
        {isPending ? (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
           <div className="flex items-center gap-2 p-6 text-red-600 bg-red-50">
             <AlertCircle className="h-5 w-5" />
             <span>{error}</span>
           </div>
        ) : data && data.data.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Currency</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.data.map((commission) => (
                <tr key={commission._id} className="hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900 capitalize">
                    {commission.type.replace(/_/g, " ")}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {formatAmount(commission)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {commission.currency}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(commission.createdAt), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(commission)} className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDelete(commission)} className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No commissions found. Add one to get started.
          </div>
        )}
      </div>

      {/* ADD/EDIT MODAL */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                {isAddModalOpen ? "Add Commission" : "Edit Commission"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
               {isAddModalOpen && (
                   <div className="space-y-2">
                        <Label>Type</Label>
                        <Select 
                            value={formData.type} 
                            onValueChange={(val: "flat_rate" | "percentage") => setFormData({...formData, type: val})}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="percentage">Percentage</SelectItem>
                                <SelectItem value="flat_rate">Flat Rate</SelectItem>
                            </SelectContent>
                        </Select>
                   </div>
               )}

               <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input 
                        type="number" 
                        placeholder={formData.type === "percentage" ? "e.g. 10" : "e.g. 5000"} 
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
               </div>

               <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select 
                        value={formData.currency} 
                        onValueChange={(val) => setFormData({...formData, currency: val})}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="NGN">NGN</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                    </Select>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={isAddModalOpen ? handleCreate : handleEdit} disabled={isSubmitting} className="bg-[#2B4EFF] hover:bg-[#1f3de0] text-white">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Commission"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && selectedCommission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
             <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                 <div className="p-6 text-center space-y-4">
                     <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                         <AlertCircle className="h-6 w-6" />
                     </div>
                     <h3 className="text-lg font-medium text-gray-900">Delete Commission</h3>
                     <p className="text-sm text-gray-500">
                         Are you sure you want to delete this {selectedCommission.type.replace(/_/g, " ")} commission of {formatAmount(selectedCommission)}? This action cannot be undone.
                     </p>
                 </div>
                 <div className="p-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl border-t border-gray-100">
                     <Button variant="outline" onClick={closeModal} disabled={isSubmitting}>
                         Cancel
                     </Button>
                     <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                         {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                     </Button>
                 </div>
             </div>
          </div>
      )}
    </div>
  );
}
