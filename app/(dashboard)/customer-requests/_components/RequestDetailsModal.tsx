"use client";

import { useState, useTransition, useEffect } from "react";
import {
  CustomerRequest,
  approveRejectCustomerRequest,
  broadcastCustomerRequest,
} from "@/lib/actions/customer-requests";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Paperclip,
  ExternalLink,
  CheckCircle,
  XCircle,
  Loader2,
  Radio,
  HelpCircle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RequestDetailsModalProps {
  request: CustomerRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles: Record<string, string> = {
  pending_approval: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function RequestDetailsModal({
  request,
  open,
  onOpenChange,
}: RequestDetailsModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "broadcast" | "approve_broadcast" | null
  >(null);

  // Broadcast configuration state
  const [isConfiguringBroadcast, setIsConfiguringBroadcast] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");
  const [pendingBroadcastAction, setPendingBroadcastAction] = useState<
    "broadcast" | "approve_broadcast" | null
  >(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setIsConfiguringBroadcast(false);
        setActionError(null);
        setActionType(null);
        setPendingBroadcastAction(null);
      }, 200);
    }
  }, [open]);

  // Set default expiration date when opening config
  useEffect(() => {
    if (isConfiguringBroadcast) {
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 30); // 30 days from now
      // Format to YYYY-MM-DDThh:mm for datetime-local input
      const tzOffset = defaultDate.getTimezoneOffset() * 60000; // offset in milliseconds
      const localISOTime = new Date(defaultDate.getTime() - tzOffset)
        .toISOString()
        .slice(0, 16);
      setExpiresAt(localISOTime);
    }
  }, [isConfiguringBroadcast]);

  if (!request) return null;

  const isPendingApproval = request.status === "pending_approval";
  const isActive = request.status === "active" || request.status === "approved";
  const event = request.eventDetails;
  const customer = request.customerId;
  const category = request.serviceCategoryId;
  const totalBudget = request.budgetAllocations.reduce(
    (sum, b) => sum + b.budgetedAmount,
    0
  );

  const startBroadcastConfig = (type: "broadcast" | "approve_broadcast") => {
    setPendingBroadcastAction(type);
    setIsConfiguringBroadcast(true);
  };

  const handleConfirmBroadcast = () => {
    if (!expiresAt) {
      setActionError("Expiration date is required.");
      return;
    }

    const isoDate = new Date(expiresAt).toISOString();
    setActionError(null);

    if (pendingBroadcastAction === "approve_broadcast") {
      setActionType("approve_broadcast");
      startTransition(async () => {
        // 1. Approve
        const approveResult = await approveRejectCustomerRequest(
          request._id,
          true
        );

        if (!approveResult.success) {
          setActionError(approveResult.error || "Approval failed.");
          setActionType(null);
          return;
        }

        // 2. Broadcast
        const broadcastResult = await broadcastCustomerRequest(
          request._id,
          isoDate
        );

        if (broadcastResult.success) {
          onOpenChange(false);
          router.refresh();
        } else {
          setActionError(
            broadcastResult.error || "Approved, but broadcast failed."
          );
        }
        setActionType(null);
      });
    } else if (pendingBroadcastAction === "broadcast") {
      setActionType("broadcast");
      startTransition(async () => {
        const result = await broadcastCustomerRequest(request._id, isoDate);

        if (result?.success) {
          onOpenChange(false);
          router.refresh();
        } else {
          setActionError(result?.error || "Broadcast failed.");
        }
        setActionType(null);
      });
    }
  };

  const handleAction = (type: "approve" | "reject") => {
    setActionError(null);
    setActionType(type);

    startTransition(async () => {
      const result = await approveRejectCustomerRequest(
        request._id,
        type === "approve"
      );

      if (result?.success) {
        onOpenChange(false);
        router.refresh();
      } else {
        setActionError(result?.error || "Something went wrong.");
      }
      setActionType(null);
    });
  };

  // ─── Broadcast Configuration View ──────────────────────────────────────────
  if (isConfiguringBroadcast) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Radio className="h-5 w-5 text-[#2B4EFF]" />
              Configure Broadcast
            </DialogTitle>
            <DialogDescription>
              Set an expiration date for these quote requests.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiration Date & Time</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().slice(0, 16)} // Cannot be in the past
                required
              />
              <p className="text-xs text-gray-500">
                Vendors will not be able to submit quotes after this time.
              </p>
            </div>

            {/* ── Error ── */}
            {actionError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 flex items-start gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-2 justify-between w-full">
            <Button
              variant="outline"
              onClick={() => {
                setIsConfiguringBroadcast(false);
                setActionError(null);
              }}
              disabled={isPending}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              className="bg-[#2B4EFF] hover:bg-[#1f3de0] text-white"
              onClick={handleConfirmBroadcast}
              disabled={isPending || !expiresAt}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Radio className="h-4 w-4 mr-2" />
              )}
              Confirm Broadcast
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // ─── Main Details View ─────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl">
                {event?.title || "Customer Request"}
              </DialogTitle>
              <Badge
                variant="outline"
                className={`rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                  statusStyles[request.status] ||
                  "bg-gray-50 text-gray-600 border-gray-200"
                }`}
              >
                {request.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <DialogDescription>Request ID: {request._id}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ── Customer Info ── */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Customer
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Name</span>
                    <span className="font-medium text-right">
                      {customer?.firstName} {customer?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-right truncate max-w-[150px]" title={customer?.email}>
                      {customer?.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-gray-500">Role</span>
                    <span className="capitalize font-medium">
                      {customer?.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Category & Budget ── */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Category & Budget
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium capitalize text-right">
                      {category?.name || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Total Budget</span>
                    <span className="font-semibold text-emerald-700 text-right">
                      ${totalBudget.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-gray-500 text-xs block mb-1.5">
                      Budget Breakdown:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {request.budgetAllocations.length > 0 ? (
                        request.budgetAllocations.map((alloc) => (
                          <Badge
                            key={alloc._id}
                            variant="secondary"
                            className="text-[10px] font-medium bg-white border-gray-200"
                          >
                            ${alloc.budgetedAmount.toLocaleString()}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Event Details ── */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Event Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-0.5">
                      Dates
                    </span>
                    <span className="font-medium block leading-tight text-xs">
                      {event?.startDate ? formatDate(event.startDate) : "—"}
                      <br />
                      <span className="text-gray-400">to</span>
                      <br />
                      {event?.endDate ? formatDate(event.endDate) : "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-gray-500 text-xs block mb-0.5">
                      Location
                    </span>
                    <span className="font-medium block truncate text-sm" title={event?.location || ""}>
                      {event?.location || "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
                  <div className="p-2 bg-pink-50 text-pink-600 rounded-md shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-xs block mb-0.5">
                      Guests Expected
                    </span>
                    <span className="font-medium text-sm">
                      {event?.guestCount?.toLocaleString() || "—"}
                    </span>
                  </div>
                </div>
              </div>

              {event?.description && (
                <div className="mt-4">
                  <span className="text-gray-500 text-xs block mb-1.5 font-medium uppercase tracking-wider">
                    Description
                  </span>
                  <div className="text-gray-700 bg-white border border-gray-100 rounded-md p-3 text-sm leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </div>
                </div>
              )}
            </div>

            {/* ── Attachments ── */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                  Attachments ({request.attachments.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {request.attachments.map((att) => (
                    <div
                      key={att._id}
                      className="group flex items-center justify-between bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm rounded-md p-2.5 text-sm transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 bg-gray-50 rounded text-gray-400 group-hover:text-blue-500 transition-colors">
                          <Paperclip className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex flex-col">
                          <span
                            className="truncate max-w-[160px] font-medium text-gray-700 text-xs"
                            title={att.originalName}
                          >
                            {att.originalName}
                          </span>
                          <span className="text-gray-400 text-[10px]">
                            {formatFileSize(att.size)} • {att.extension.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors shrink-0"
                        title="View Full File"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Timestamps ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-2 bg-gray-50/50 p-3 rounded-md text-[11px] text-gray-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">Created:</span>
                {formatDate(request.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">Updated:</span>
                {formatDate(request.updatedAt)}
              </span>
            </div>

            {/* ── Error ── */}
            {actionError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100 flex items-start gap-2">
                <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{actionError}</span>
              </div>
            )}
          </div>

          {/* ── Footer Actions ── */}
          <DialogFooter className="gap-2 sm:gap-2 mt-2 pt-4 border-t border-gray-100">
            {isPendingApproval ? (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Review request before approving or rejecting
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 flex-1 sm:flex-none"
                      disabled={isPending}
                      onClick={() => handleAction("reject")}
                    >
                      {actionType === "reject" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}
                      Reject
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-9 w-9 text-gray-400 hover:text-gray-600 shrink-0"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="max-w-[200px] text-center">
                          Marks the request as rejected. It will not be visible
                          to vendors.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 flex-1 sm:flex-none"
                      disabled={isPending}
                      onClick={() => handleAction("approve")}
                    >
                      {actionType === "approve" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve Only
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-9 w-9 text-gray-400 hover:text-gray-600 shrink-0"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="max-w-[200px] text-center">
                          Approves the request to ACTIVE status, but DOES NOT
                          broadcast it to vendors yet.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <Button
                      className="bg-[#2B4EFF] hover:bg-[#1f3de0] text-white flex-1 sm:flex-none shadow-sm"
                      disabled={isPending}
                      onClick={() => startBroadcastConfig("approve_broadcast")}
                    >
                      <Radio className="h-4 w-4 mr-2" />
                      Approve & Broadcast
                    </Button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="h-9 w-9 text-gray-400 hover:text-gray-600 shrink-0"
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="max-w-[200px] text-center">
                          Approves the request AND allows you to broadcast it to
                          matching vendors so they can submit quotes.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ) : isActive ? (
              <div className="w-full flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Status is Active. You can broadcast this to vendors.
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    className="bg-[#2B4EFF] hover:bg-[#1f3de0] text-white shadow-sm"
                    disabled={isPending}
                    onClick={() => startBroadcastConfig("broadcast")}
                  >
                    <Radio className="h-4 w-4 mr-2" />
                    Broadcast to Vendors
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-9 w-9 text-gray-400 hover:text-gray-600 shrink-0"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="max-w-[200px] text-center">
                        Broadcasts this active request to matching vendors so
                        they can discover it and submit quotes.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
