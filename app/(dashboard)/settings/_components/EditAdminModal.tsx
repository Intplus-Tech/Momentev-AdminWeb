"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateAdmin, getAdminById, UpdateAdminData, AdminUser } from "@/lib/actions/admins";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RolesAndPermissions } from "@/lib/actions/admins";
import PermissionsSelector from "./PermissionsSelector";

interface Props {
  adminId: string;
  onClose: () => void;
  onSuccess: () => void;
  rolesAndPermissions?: RolesAndPermissions | null;
}

export default function EditAdminModal({ adminId, onClose, onSuccess, rolesAndPermissions }: Props) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<UpdateAdminData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    adminPermissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdmin() {
      const res = await getAdminById(adminId);
      if (res.success && res.data) {
        console.log("Fetched Admin Details:", res.data);
        setAdmin(res.data);
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          // @ts-ignore - if the backend returns phoneNumber we use it, otherwise empty string
          phoneNumber: res.data.phoneNumber || "", 
          adminPermissions: res.data.adminPermissions || [],
        });
      } else {
        toast.error("Failed to load admin details");
        onClose();
      }
      setFetching(false);
    }
    loadAdmin();
  }, [adminId, onClose]);

  const handlePermissionsChange = (newPermissions: string[]) => {
    setFormData((prev) => ({ ...prev, adminPermissions: newPermissions }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Omit phoneNumber from the payload if it's empty to prevent validation errors
      const payload: UpdateAdminData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        permissions: formData.adminPermissions,
      };

      if (formData.phoneNumber && formData.phoneNumber.trim().length > 0) {
        payload.phoneNumber = formData.phoneNumber.trim();
      }

      if (!admin) return;

      const response = await updateAdmin(admin.id, payload);
      if (response.success) {
        toast.success("Admin updated successfully");
        onSuccess();
      } else {
        setError(response.error || "Failed to update admin");
        toast.error(response.error || "Failed to update admin");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Edit Admin</h2>
        <button onClick={onClose} disabled={loading}>
          <X className="hover:text-red-500" />
        </button>
      </div>

      {fetching ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="+1234567890"
            disabled={loading}
          />
        </div>

        {rolesAndPermissions?.adminPermissionGroups && (
          <div className="space-y-2 pt-2 border-t mt-4">
            <Label className="text-base font-semibold">Admin Permissions</Label>
            <p className="text-sm text-gray-500 mb-2">
              Select the modules and actions this admin can access.
            </p>
            <PermissionsSelector
              groups={rolesAndPermissions.adminPermissionGroups}
              selectedPermissions={formData.adminPermissions || []}
              onChange={handlePermissionsChange}
              disabled={loading}
            />
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
        </>
      )}
    </div>
  );
}
