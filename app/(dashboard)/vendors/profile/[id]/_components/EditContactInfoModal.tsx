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
import {
  updateBusinessProfile,
  UpdateBusinessProfileInput,
  VendorProfile,
} from "@/lib/actions/vendors";

interface EditContactInfoModalProps {
  vendor: VendorProfile;
}

interface ContactFormState {
  primaryContactName: string;
  emailAddress: string;
  phoneNumber: string;
  meansOfIdentification: string;
}

function normalizeString(value?: string | null) {
  return value || "";
}

export default function EditContactInfoModal({ vendor }: EditContactInfoModalProps) {
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

  const [form, setForm] = useState<ContactFormState>({
    primaryContactName: normalizeString(contactInfo?.primaryContactName),
    emailAddress: normalizeString(contactInfo?.emailAddress),
    phoneNumber: normalizeString(contactInfo?.phoneNumber),
    meansOfIdentification: normalizeString(contactInfo?.meansOfIdentification),
  });

  const resetForm = () => {
    setForm({
      primaryContactName: normalizeString(contactInfo?.primaryContactName),
      emailAddress: normalizeString(contactInfo?.emailAddress),
      phoneNumber: normalizeString(contactInfo?.phoneNumber),
      meansOfIdentification: normalizeString(contactInfo?.meansOfIdentification),
    });
  };

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!profile?._id) {
      toast.error("Business profile is missing. Cannot update this vendor yet.");
      return;
    }

    const payload: UpdateBusinessProfileInput = {
      businessName: profile.businessName,
      yearInBusiness: profile.yearInBusiness,
      businessRegType: profile.businessRegType,
      companyRegNo: profile.companyRegNo,
      businessDescription: profile.businessDescription,
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
        toast.error(result.error || "Failed to update contact information");
        return;
      }

      toast.success("Contact information updated successfully.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred while updating contact information.");
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

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
          <DialogDescription>
            Update business-facing contact details for this vendor.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="contact-primaryContactName">Primary Contact</Label>
            <Input
              id="contact-primaryContactName"
              value={form.primaryContactName}
              onChange={(event) => updateField("primaryContactName", event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="contact-emailAddress">Business Email</Label>
            <Input
              id="contact-emailAddress"
              type="email"
              value={form.emailAddress}
              onChange={(event) => updateField("emailAddress", event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phoneNumber">Business Phone</Label>
            <Input
              id="contact-phoneNumber"
              value={form.phoneNumber}
              onChange={(event) => updateField("phoneNumber", event.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-meansOfIdentification">Identification</Label>
            <Input
              id="contact-meansOfIdentification"
              value={form.meansOfIdentification}
              onChange={(event) => updateField("meansOfIdentification", event.target.value)}
              disabled={isSaving}
            />
          </div>
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
