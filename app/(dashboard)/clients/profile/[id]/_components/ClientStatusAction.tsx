"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClientProfile, updateClientStatus } from "@/lib/actions/clients";
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
import { Ban, CheckCircle } from "lucide-react";

interface StatusActionProps {
  client: ClientProfile;
}

export default function ClientStatusAction({ client }: StatusActionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isBanned = client.status === "banned";
  const action = isBanned ? "reactivate" : "suspend";
  const ButtonIcon = isBanned ? CheckCircle : Ban;
  const buttonVariant = isBanned ? "default" : "destructive";
  const buttonText = isBanned ? "Reactivate Account" : "Suspend Account";

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      // Provide a generic reason if suspending, or null/undefined if reactivating
      const reason = isBanned ? undefined : "Suspended by admin via dashboard";
      
      const res = await updateClientStatus(client._id, action, reason);

      if (!res.success) {
        toast.error(res.error || `Failed to ${action} account`);
        return;
      }

      toast.success(
        `Account has been successfully ${
          isBanned ? "reactivated" : "suspended"
        }.`
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
            Are you sure you want to {action} this account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isBanned
              ? "Reactivating this account will restore the client's ability to log in and interact with the platform."
              : "Suspending this account will immediately revoke the client's access and they will no longer be able to log in or make bookings."}
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
            className={isBanned ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}
          >
            {loading ? "Processing..." : `Confirm ${action}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
