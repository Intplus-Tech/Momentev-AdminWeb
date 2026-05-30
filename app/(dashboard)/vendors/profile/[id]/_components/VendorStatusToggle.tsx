"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { VendorProfile, updateVendorStatus } from "@/lib/actions/vendors";

interface Props {
  vendor: VendorProfile;
}

export default function VendorStatusToggle({ vendor }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = vendor.isActive;
  const action = isActive ? "suspend" : "reactivate";
  const buttonText = isActive ? "Suspend Account" : "Reactivate Account";
  const buttonVariant = isActive ? "destructive" : "default";
  const ButtonIcon = isActive ? Ban : CheckCircle;

  const handleStatusChange = async () => {
    setLoading(true);

    try {
      const reason = isActive ? "Suspended by admin via dashboard" : undefined;
      const result = await updateVendorStatus(vendor.id, action, reason);

      if (!result.success) {
        toast.error(result.error || `Failed to ${action} vendor account`);
        return;
      }

      toast.success(
        `Vendor account has been successfully ${isActive ? "suspended" : "reactivated"}.`
      );
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} size="sm" className="gap-2">
          <ButtonIcon className="w-4 h-4" />
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {action} this vendor account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? "Suspending this account will hide the vendor from public listings and prevent the owner from logging in."
              : "Reactivating this account will restore the vendor's access to the dashboard and public listings."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleStatusChange();
            }}
            disabled={loading}
            className={isActive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </span>
            ) : (
              `Confirm ${action}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
