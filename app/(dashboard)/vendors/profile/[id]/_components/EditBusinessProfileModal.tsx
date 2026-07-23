"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import {
  updateBusinessProfile,
  UpdateBusinessProfileInput,
  VendorProfile,
} from "@/lib/actions/vendors";

interface EditBusinessProfileModalProps {
  vendor: VendorProfile;
}

interface FormState {
  businessName: string;
  yearInBusiness: string;
  businessRegType: string;
  companyRegNo: string;
  businessDescription: string;
  primaryContactName: string;
  emailAddress: string;
  phoneNumber: string;
  meansOfIdentification: string;
}

function normalizeString(value?: string | null) {
  return value || "";
}

export default function EditBusinessProfileModal({ vendor }: EditBusinessProfileModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const profile = vendor.businessProfile;
  const contactInfo = profile?.contactInfo;
  const existingAddressId = useMemo(() => {
    const rawAddressId = contactInfo?.addressId;
    if (!rawAddressId) return undefined;
    if (typeof rawAddressId === "string") return rawAddressId;
    return rawAddressId._id || rawAddressId.id;
  }, [contactInfo?.addressId]);

  const [form, setForm] = useState<FormState>({
    businessName: normalizeString(profile?.businessName),
    yearInBusiness: normalizeString(profile?.yearInBusiness),
    businessRegType: normalizeString(profile?.businessRegType),
    companyRegNo: normalizeString(profile?.companyRegNo),
    businessDescription: normalizeString(profile?.businessDescription),
    primaryContactName: normalizeString(contactInfo?.primaryContactName),
    emailAddress: normalizeString(contactInfo?.emailAddress),
    phoneNumber: normalizeString(contactInfo?.phoneNumber),
    meansOfIdentification: normalizeString(contactInfo?.meansOfIdentification),
  });

  const resetForm = () => {
    setForm({
      businessName: normalizeString(profile?.businessName),
      yearInBusiness: normalizeString(profile?.yearInBusiness),
      businessRegType: normalizeString(profile?.businessRegType),
      companyRegNo: normalizeString(profile?.companyRegNo),
      businessDescription: normalizeString(profile?.businessDescription),
      primaryContactName: normalizeString(contactInfo?.primaryContactName),
      emailAddress: normalizeString(contactInfo?.emailAddress),
      phoneNumber: normalizeString(contactInfo?.phoneNumber),
      meansOfIdentification: normalizeString(contactInfo?.meansOfIdentification),
    });
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!profile?._id) {
      toast.error("Business profile is missing. Cannot update this vendor yet.");
      return;
    }

    const trimmedBusinessName = form.businessName.trim();
    if (!trimmedBusinessName) {
      toast.error("Business name is required.");
      return;
    }

    const payload: UpdateBusinessProfileInput = {
      businessName: trimmedBusinessName,
      yearInBusiness: form.yearInBusiness.trim() || undefined,
      businessRegType: form.businessRegType.trim() || undefined,
      companyRegNo: form.companyRegNo.trim() || undefined,
      businessDescription: form.businessDescription.trim() || undefined,
      contactInfo: {
        primaryContactName: form.primaryContactName.trim() || undefined,
        emailAddress: form.emailAddress.trim() || undefined,
        phoneNumber: form.phoneNumber.trim() || undefined,
        meansOfIdentification: form.meansOfIdentification.trim() || undefined,
        addressId: existingAddressId,
      },
    };

    setIsSaving(true);
    try {
      const result = await updateBusinessProfile(profile._id, payload, vendor.id);
      if (!result.success) {
        toast.error(result.error || "Failed to update business profile");
        return;
      }

      toast.success("Business profile updated successfully.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred while updating business profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Vendor Business Profile</DialogTitle>
          <DialogDescription>
            Update business and contact information for this vendor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section className="rounded-xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Business Information</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={form.businessName}
                  onChange={(event) => updateField("businessName", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearInBusiness">Years in Business</Label>
                <Input
                  id="yearInBusiness"
                  value={form.yearInBusiness}
                  onChange={(event) => updateField("yearInBusiness", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessRegType">Business Type</Label>
                <Input
                  id="businessRegType"
                  value={form.businessRegType}
                  onChange={(event) => updateField("businessRegType", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRegNo">Registration Number</Label>
                <Input
                  id="companyRegNo"
                  value={form.companyRegNo}
                  onChange={(event) => updateField("companyRegNo", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={form.businessDescription}
                  onChange={(event) => updateField("businessDescription", event.target.value)}
                  className="min-h-24"
                  disabled={isSaving}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 p-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primaryContactName">Primary Contact</Label>
                <Input
                  id="primaryContactName"
                  value={form.primaryContactName}
                  onChange={(event) => updateField("primaryContactName", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Business Email</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={form.emailAddress}
                  onChange={(event) => updateField("emailAddress", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Business Phone</Label>
                <Input
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={(event) => updateField("phoneNumber", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meansOfIdentification">Identification</Label>
                <Input
                  id="meansOfIdentification"
                  value={form.meansOfIdentification}
                  onChange={(event) => updateField("meansOfIdentification", event.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="addressId">Address ID (read-only)</Label>
                <Input id="addressId" value={existingAddressId || "—"} readOnly disabled />
              </div>
            </div>
          </section>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
