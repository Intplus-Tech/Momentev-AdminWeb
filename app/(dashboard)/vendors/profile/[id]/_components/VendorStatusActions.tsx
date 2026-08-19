"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, CheckCircle, Loader2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { VendorProfile, suspendVendor, banVendor, reactivateVendor } from "@/lib/actions/vendors";

interface Props {
  vendor: VendorProfile;
}

type ActionType = "suspend" | "ban" | "reactivate" | null;

type VendorStatus = "active" | "suspended" | "banned";

function getVendorStatus(vendor: VendorProfile): VendorStatus {
  const userStatus = vendor.userId?.status?.toLowerCase();

  if (userStatus === "active" || userStatus === "suspended" || userStatus === "banned") {
    return userStatus;
  }

  if (vendor.vendorStatus) {
    return vendor.vendorStatus;
  }

  return vendor.isActive ? "active" : "suspended";
}

export default function VendorStatusActions({ vendor }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ActionType>(null);
  const [reason, setReason] = useState("");

  const vendorStatus = getVendorStatus(vendor);
  const isActive = vendorStatus === "active";
  const isSuspended = vendorStatus === "suspended";
  const isBanned = vendorStatus === "banned";

  const getStatusBadge = () => {
    if (isBanned) {
      return <Badge variant="destructive" className="bg-red-600">Banned</Badge>;
    }
    if (isSuspended) {
      return <Badge variant="secondary" className="bg-amber-100 text-amber-900">Suspended</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">Active</Badge>;
  };

  const handleAction = async () => {
    if (!activeAction) return;

    setLoading(true);
    try {
      let result;

      if (activeAction === "suspend") {
        result = await suspendVendor(vendor.id, reason || undefined);
      } else if (activeAction === "ban") {
        result = await banVendor(vendor.id, reason || undefined);
      } else if (activeAction === "reactivate") {
        result = await reactivateVendor(vendor.id, reason || undefined);
      }

      if (!result?.success) {
        toast.error(result?.error || `Failed to ${activeAction} vendor account`);
        return;
      }

      const actionMessages = {
        suspend: "Vendor account has been successfully suspended.",
        ban: "Vendor account has been successfully banned.",
        reactivate: "Vendor account has been successfully reactivated.",
      };

      toast.success(actionMessages[activeAction]);
      setOpen(false);
      setReason("");
      setActiveAction(null);
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (action: ActionType) => {
    setActiveAction(action);
    setReason("");
    setOpen(true);
  };

  const getDialogConfig = () => {
    switch (activeAction) {
      case "suspend":
        return {
          title: "Suspend Vendor Account?",
          description:
            "Suspending this vendor account will remove them from public listings and prevent them from logging in. They will retain their data but will be unable to access the dashboard or accept new bookings.",
          buttonText: "Suspend Account",
          buttonClass: "bg-amber-600 hover:bg-amber-700 text-white",
        };
      case "ban":
        return {
          title: "Ban Vendor Account?",
          description:
            "Banning this vendor account will completely remove them from the platform. They will be unable to log in and their listings will be hidden. This action is more severe than suspension and should only be used for serious violations.",
          buttonText: "Ban Account",
          buttonClass: "bg-red-600 hover:bg-red-700 text-white",
        };
      case "reactivate":
        return {
          title: "Reactivate Vendor Account?",
          description:
            "Reactivating this account will restore the vendor's access to the dashboard and allow them to resume accepting bookings. Their account and listings will be visible again.",
          buttonText: "Reactivate Account",
          buttonClass: "bg-green-600 hover:bg-green-700 text-white",
        };
      default:
        return {
          title: "",
          description: "",
          buttonText: "",
          buttonClass: "",
        };
    }
  };

  const config = getDialogConfig();

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Status:</span>
            {getStatusBadge()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <AlertDialog open={open && activeAction !== null} onOpenChange={(isOpen) => {
              if (!isOpen) {
                setOpen(false);
                setActiveAction(null);
                setReason("");
              }
            }}>
              {isActive ? (
                <>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
                      onClick={() => openDialog("suspend")}
                    >
                      <Pause className="w-4 h-4" />
                      Suspend
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-2"
                      onClick={() => openDialog("ban")}
                    >
                      <Ban className="w-4 h-4" />
                      Ban
                    </Button>
                  </AlertDialogTrigger>
                </>
              ) : (
                <AlertDialogTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => openDialog("reactivate")}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {isBanned ? "Reactivate" : "Reactivate"}
                  </Button>
                </AlertDialogTrigger>
              )}

              {activeAction && (
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{config.title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      {config.description}
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  {/* Reason Input */}
                  <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason (Optional)
                    </label>
                    <Textarea
                      placeholder={`Enter reason for ${activeAction} (will be recorded in audit log)`}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="min-h-20 resize-none text-sm"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This reason will be recorded in the vendor's audit log for transparency.
                    </p>
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault();
                        handleAction();
                      }}
                      disabled={loading}
                      className={config.buttonClass}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Confirm ${activeAction}`
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Suspension Reason Display */}
      {(isSuspended || isBanned) && vendor.suspensionReason && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-xs font-medium text-gray-600 mb-1">
            {isBanned ? "Ban Reason:" : "Suspension Reason:"}
          </p>
          <p className="text-sm text-gray-700">{vendor.suspensionReason}</p>
        </div>
      )}
    </>
  );
}
