"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { syncStripePaymentStatuses } from "@/lib/actions/finance";
import { useRouter } from "next/navigation";

export function SyncStripeButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    setIsSyncing(true);
    const toastId = toast.loading("Syncing Stripe payment statuses...");

    try {
      const result = await syncStripePaymentStatuses();

      if (result.success) {
        toast.success("Stripe sync completed successfully.", { id: toastId });
        router.refresh();
      } else {
        toast.error(result.error || "Failed to sync Stripe payment statuses.", { id: toastId });
      }
    } catch (error) {
      toast.error("An unexpected error occurred during sync.", { id: toastId });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Button 
      onClick={handleSync} 
      disabled={isSyncing}
      variant="outline"
      className="flex items-center gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
      Sync Stripe
    </Button>
  );
}
