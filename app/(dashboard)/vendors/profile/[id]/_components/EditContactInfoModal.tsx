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
  updateVendor,
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
}

interface SocialLinkFormItem {
  name: string;
  link: string;
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
  const initialSocialLinks = useMemo(() => {
    const links = (vendor.socialMediaLinks || [])
      .filter((link) => link?.name)
      .map((link) => ({
        name: normalizeString(link.name),
        link: normalizeString(link.link),
      }));

    return links.length > 0 ? links : [{ name: "website", link: "" }];
  }, [vendor.socialMediaLinks]);
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
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinkFormItem[]>(initialSocialLinks);

  const resetForm = () => {
    setForm({
      primaryContactName: normalizeString(contactInfo?.primaryContactName),
      emailAddress: normalizeString(contactInfo?.emailAddress),
      phoneNumber: normalizeString(contactInfo?.phoneNumber),
    });
    setSocialLinks(initialSocialLinks);
  };

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!profile?._id) {
      toast.error("Business profile is missing. Cannot update this vendor yet.");
      return;
    }

    const primaryContactName = form.primaryContactName.trim();
    const emailAddress = form.emailAddress.trim();
    const phoneNumber = form.phoneNumber.trim();

    if (!primaryContactName || !emailAddress || !phoneNumber) {
      toast.error("Primary contact, business email, and business phone are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress)) {
      toast.error("Please enter a valid business email address.");
      return;
    }

    const normalizedSocialLinks = socialLinks
      .map((item) => {
        const name = item.name.trim();
        const rawLink = item.link.trim();
        const link = rawLink && !/^https?:\/\//i.test(rawLink) ? `https://${rawLink}` : rawLink;
        return { name, link };
      })
      .filter((item) => item.name.length > 0 && item.link.length > 0);

    for (const socialLink of normalizedSocialLinks) {
      if (!/^https?:\/\//i.test(socialLink.link)) {
        toast.error(`Please enter a valid URL for ${socialLink.name}.`);
        return;
      }
    }

    const payload: UpdateBusinessProfileInput = {
      businessName: profile.businessName,
      yearInBusiness: profile.yearInBusiness,
      businessRegType: profile.businessRegType,
      companyRegNo: profile.companyRegNo,
      businessDescription: profile.businessDescription,
      contactInfo: {
        primaryContactName,
        emailAddress,
        phoneNumber,
        meansOfIdentification: contactInfo?.meansOfIdentification,
        addressId: existingAddressId,
      },
    };

    setIsSaving(true);
    try {
      const businessProfileResult = await updateBusinessProfile(profile._id, payload, vendor.id);
      if (!businessProfileResult.success) {
        toast.error(businessProfileResult.error || "Failed to update contact information");
        return;
      }

      const vendorResult = await updateVendor(vendor.id, {
        socialMediaLinks: normalizedSocialLinks,
      });

      if (!vendorResult.success) {
        toast.error(vendorResult.error || "Contact details updated, but website failed to update.");
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
            Update business-facing contact details and social links for this vendor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <section className="rounded-xl border border-gray-200 p-4">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Contact Details</h4>
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

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="contact-phoneNumber">Business Phone</Label>
                <Input
                  id="contact-phoneNumber"
                  value={form.phoneNumber}
                  onChange={(event) => updateField("phoneNumber", event.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 p-4">
            <h4 className="mb-1 text-sm font-semibold text-gray-900">Social Links</h4>
            <p className="mb-4 text-xs text-gray-500">Update each platform URL for this vendor.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {socialLinks.map((socialLink, index) => {
                const inputId = `contact-social-${socialLink.name || index}`;
                return (
                  <div className="space-y-2" key={`${socialLink.name}-${index}`}>
                    <Label htmlFor={inputId} className="capitalize">{socialLink.name || "Social Link"}</Label>
                    <Input
                      id={inputId}
                      placeholder="https://example.com"
                      value={socialLink.link}
                      onChange={(event) => {
                        const nextLink = event.target.value;
                        setSocialLinks((prev) =>
                          prev.map((item, itemIndex) =>
                            itemIndex === index ? { ...item, link: nextLink } : item
                          )
                        );
                      }}
                      disabled={isSaving}
                    />
                  </div>
                );
              })}
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
