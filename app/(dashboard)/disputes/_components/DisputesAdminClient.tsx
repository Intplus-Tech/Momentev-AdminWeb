"use client";

import { FormEvent, useEffect, useMemo, useState, useTransition } from "react";
import {
  DisputeResolutionRecord,
  EscalationLevelOption,
  EscalationReasonOption,
  PaginatedDisputeResolutions,
  escalateDispute,
  getDisputeResolutions,
  getEscalationLevels,
  getEscalationReasons,
  resolveDispute,
} from "@/lib/actions/disputes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, X } from "lucide-react";

const RESOLUTION_FILTER_OPTIONS = [
  "all",
  "partial_refund",
  "vendor_credit",
  "full_refund",
  "denied",
  "mediated",
] as const;

type ResolutionFilterValue = (typeof RESOLUTION_FILTER_OPTIONS)[number];
type ResolutionActionValue =
  | "partial_refund"
  | "vendor_credit"
  | "full_refund"
  | "deny"
  | "mediated";
type UrgencyValue = "normal" | "high" | "critical";

function formatCurrency(minor: number, currency: string) {
  return (minor / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: currency || "GBP",
    maximumFractionDigits: 2,
  });
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function titleize(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function DisputesAdminClient() {
  const [levels, setLevels] = useState<EscalationLevelOption[]>([]);
  const [reasons, setReasons] = useState<EscalationReasonOption[]>([]);
  const [resolutionsPage, setResolutionsPage] =
    useState<PaginatedDisputeResolutions>({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
    });

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [resolutionFilter, setResolutionFilter] =
    useState<ResolutionFilterValue>("all");
  const [vendorId, setVendorId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedRecord, setSelectedRecord] =
    useState<DisputeResolutionRecord | null>(null);
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const [escalationLevel, setEscalationLevel] = useState("");
  const [escalationReason, setEscalationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState<UrgencyValue>("normal");

  const [resolutionAction, setResolutionAction] =
    useState<ResolutionActionValue>("partial_refund");
  const [amountMinor, setAmountMinor] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [resolutionNotes, setResolutionNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [escalateFeedback, setEscalateFeedback] = useState<string | null>(null);
  const [resolveFeedback, setResolveFeedback] = useState<string | null>(null);

  const [isBootPending, startBootTransition] = useTransition();
  const [isTablePending, startTableTransition] = useTransition();
  const [isEscalatePending, startEscalateTransition] = useTransition();
  const [isResolvePending, startResolveTransition] = useTransition();

  const selectedReason = useMemo(
    () => reasons.find((reason) => reason.value === escalationReason),
    [reasons, escalationReason],
  );

  const selectedDisputeId = selectedRecord?.disputeId?._id || "";

  const totalPages = Math.max(
    1,
    Math.ceil((resolutionsPage.total || 0) / (resolutionsPage.limit || limit)),
  );

  const loadBootData = () => {
    startBootTransition(async () => {
      setError(null);

      const [levelsResult, reasonsResult] = await Promise.all([
        getEscalationLevels(),
        getEscalationReasons(),
      ]);

      if (!levelsResult.success || !levelsResult.data) {
        setError(levelsResult.error || "Failed to load escalation levels");
        return;
      }

      if (!reasonsResult.success || !reasonsResult.data) {
        setError(reasonsResult.error || "Failed to load escalation reasons");
        return;
      }

      setLevels(levelsResult.data);
      setReasons(reasonsResult.data);

      if (levelsResult.data.length > 0) {
        setEscalationLevel(levelsResult.data[0].value);
      }

      if (reasonsResult.data.length > 0) {
        setEscalationReason(reasonsResult.data[0].value);
      }
    });
  };

  const loadResolutions = (targetPage?: number) => {
    const requestedPage = targetPage ?? page;

    startTableTransition(async () => {
      setError(null);
      const result = await getDisputeResolutions({
        page: requestedPage,
        limit,
        resolution: resolutionFilter,
        vendorId,
        from: fromDate || undefined,
        to: toDate || undefined,
      });

      if (!result.success || !result.data) {
        setError(result.error || "Failed to load dispute resolutions");
        return;
      }

      setResolutionsPage(result.data);
    });
  };

  useEffect(() => {
    loadBootData();
  }, []);

  useEffect(() => {
    loadResolutions();
  }, [page, resolutionFilter]);

  const applyFilters = () => {
    setPage(1);
    loadResolutions(1);
  };

  const hasActiveFilters = resolutionFilter !== "all" || vendorId || fromDate || toDate;

  const openEscalateModal = (record: DisputeResolutionRecord) => {
    setSelectedRecord(record);
    setEscalateFeedback(null);
    setAdditionalContext("");
    setOtherReason("");
    setIsEscalateModalOpen(true);
  };

  const openResolveModal = (record: DisputeResolutionRecord) => {
    setSelectedRecord(record);
    setResolveFeedback(null);
    setAmountMinor("");
    setResolutionNotes("");
    setIsResolveModalOpen(true);
  };

  const handleEscalate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEscalateFeedback(null);

    if (!selectedDisputeId) {
      setEscalateFeedback("No dispute selected.");
      return;
    }

    if (!escalationLevel || !escalationReason) {
      setEscalateFeedback("Escalation level and reason are required.");
      return;
    }

    if (selectedReason?.requiresOtherText && otherReason.trim().length < 2) {
      setEscalateFeedback(
        "Please provide a valid otherReason (minimum 2 characters).",
      );
      return;
    }

    startEscalateTransition(async () => {
      const result = await escalateDispute({
        disputeId: selectedDisputeId,
        escalationLevel,
        escalationReason,
        urgencyLevel,
        additionalContext: additionalContext.trim() || undefined,
        otherReason: selectedReason?.requiresOtherText
          ? otherReason.trim()
          : undefined,
      });

      if (!result.success) {
        setEscalateFeedback(result.error || "Failed to escalate dispute.");
        return;
      }

      setEscalateFeedback("Dispute escalated successfully.");
      loadResolutions();
    });
  };

  const handleResolve = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResolveFeedback(null);

    if (!selectedDisputeId) {
      setResolveFeedback("No dispute selected.");
      return;
    }

    const parsedAmount = amountMinor.trim() ? Number(amountMinor) : undefined;
    if (amountMinor.trim() && Number.isNaN(parsedAmount)) {
      setResolveFeedback("amountMinor must be a valid number.");
      return;
    }

    startResolveTransition(async () => {
      const result = await resolveDispute({
        disputeId: selectedDisputeId,
        resolution: resolutionAction,
        amountMinor: parsedAmount,
        currency: currency.trim() || undefined,
        notes: resolutionNotes.trim() || undefined,
      });

      if (!result.success) {
        setResolveFeedback(result.error || "Failed to resolve dispute.");
        return;
      }

      setResolveFeedback("Dispute resolved successfully.");
      loadResolutions();
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Dispute Resolutions</h2>
        <p className="text-sm text-gray-500">
          Open any dispute record and take escalation or resolution action from the dispute modal.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Resolution Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">Status:</span>
              <Select
                value={resolutionFilter}
                onValueChange={(value: ResolutionFilterValue) => {
                  setResolutionFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[160px] h-9 bg-white">
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  {RESOLUTION_FILTER_OPTIONS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vendor ID Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">Vendor ID:</span>
              <Input
                id="vendor-id-filter"
                placeholder="Vendor ObjectId"
                value={vendorId}
                onChange={(event) => setVendorId(event.target.value)}
                className="h-9 w-[160px] bg-white"
              />
            </div>

            {/* Date Filters */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">From:</span>
              <Input
                type="date"
                value={fromDate ? fromDate.split('T')[0] : ""}
                onChange={(event) => setFromDate(event.target.value)}
                className="h-9 w-auto bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 hidden sm:inline">To:</span>
              <Input
                type="date"
                value={toDate ? toDate.split('T')[0] : ""}
                onChange={(event) => setToDate(event.target.value)}
                className="h-9 w-auto bg-white"
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="h-9"
              onClick={applyFilters}
              disabled={isTablePending}
            >
              Apply
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setResolutionFilter("all");
                  setVendorId("");
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                  loadResolutions(1);
                }}
                disabled={isTablePending}
                className="text-gray-500 hover:text-red-600 ml-2"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {error && <div className="p-4"><p className="text-sm text-destructive">{error}</p></div>}

        <div className="overflow-x-auto relative min-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Case ID</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Dispute Status</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Resolution</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Amount</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Client</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Vendor</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Resolved By</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Resolved At</TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isTablePending || isBootPending ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    Loading dispute resolutions...
                  </TableCell>
                </TableRow>
              ) : resolutionsPage.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    No dispute resolutions found.
                  </TableCell>
                </TableRow>
              ) : (
                resolutionsPage.data.map((item: DisputeResolutionRecord) => {
                  const adminName =
                    `${item.resolvedByAdminId?.firstName || ""} ${item.resolvedByAdminId?.lastName || ""}`.trim();
                  const isActionDisabled =
                    !item.disputeId?._id ||
                    item.disputeId?.status?.toLowerCase() === "closed";
                  return (
                    <TableRow key={item._id}>
                      <TableCell>
                        {item.caseId || item.disputeId?.caseId || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.disputeId?.status || "-"}
                        </Badge>
                      </TableCell>
                      <TableCell>{titleize(item.resolution || "-")}</TableCell>
                      <TableCell>
                        {formatCurrency(
                          item.amountMinor || 0,
                          item.currency || "GBP",
                        )}
                      </TableCell>
                      <TableCell>
                        {item.disputeId?.client?.nameSnapshot || "-"}
                      </TableCell>
                      <TableCell>
                        {item.disputeId?.vendor?.nameSnapshot || "-"}
                      </TableCell>
                      <TableCell>{adminName || "-"}</TableCell>
                      <TableCell>{formatDate(item.resolvedAt)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="link"
                              disabled={isActionDisabled}
                              aria-label="More actions"
                              className="p-0 h-auto text-xs text-[#2B4EFF] disabled:pointer-events-auto disabled:cursor-not-allowed disabled:text-gray-400"
                            >
                              View
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openEscalateModal(item)}
                            >
                              Escalate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openResolveModal(item)}
                            >
                              Resolve
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Total: {resolutionsPage.totalCount} | Page {resolutionsPage.page} of{" "}
            {resolutionsPage.totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.max(1, page - 1);
                setPage(newPage);
                loadResolutions(newPage);
              }}
              disabled={page <= 1 || isTablePending}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newPage = Math.min(resolutionsPage.totalPages, page + 1);
                setPage(newPage);
                loadResolutions(newPage);
              }}
              disabled={page >= resolutionsPage.totalPages || isTablePending}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isEscalateModalOpen} onOpenChange={setIsEscalateModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Escalate Dispute</DialogTitle>
            <DialogDescription>
              Escalation action for the selected dispute. Dispute ID is
              auto-filled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1 rounded-md border p-3 text-sm">
            <p>
              <span className="font-medium">Case ID:</span>{" "}
              {selectedRecord?.caseId ||
                selectedRecord?.disputeId?.caseId ||
                "-"}
            </p>
            <p>
              <span className="font-medium">Dispute ID:</span>{" "}
              {selectedDisputeId || "-"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {selectedRecord?.disputeId?.status || "-"}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleEscalate}>
            <div className="space-y-2">
              <Label>Escalation Level</Label>
              <Select
                value={escalationLevel}
                onValueChange={setEscalationLevel}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Escalation Reason</Label>
              <Select
                value={escalationReason}
                onValueChange={(value) => {
                  setEscalationReason(value);
                  setOtherReason("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <Select
                value={urgencyLevel}
                onValueChange={(value: UrgencyValue) => setUrgencyLevel(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">normal</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                  <SelectItem value="critical">critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedReason?.requiresOtherText && (
              <div className="space-y-2">
                <Label htmlFor="other-reason">otherReason</Label>
                <Input
                  id="other-reason"
                  placeholder="Provide reason (2-200 chars)"
                  value={otherReason}
                  onChange={(event) => setOtherReason(event.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additional-context">additionalContext</Label>
              <Textarea
                id="additional-context"
                placeholder="Optional context for escalation"
                value={additionalContext}
                onChange={(event) => setAdditionalContext(event.target.value)}
              />
            </div>

            {escalateFeedback && (
              <p className="text-sm text-muted-foreground">
                {escalateFeedback}
              </p>
            )}

            <Button
              type="submit"
              disabled={isEscalatePending || !selectedDisputeId}
            >
              {isEscalatePending ? "Escalating..." : "Escalate"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isResolveModalOpen} onOpenChange={setIsResolveModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resolve Dispute</DialogTitle>
            <DialogDescription>
              Resolution action for the selected dispute. Dispute ID is
              auto-filled.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1 rounded-md border p-3 text-sm">
            <p>
              <span className="font-medium">Case ID:</span>{" "}
              {selectedRecord?.caseId ||
                selectedRecord?.disputeId?.caseId ||
                "-"}
            </p>
            <p>
              <span className="font-medium">Dispute ID:</span>{" "}
              {selectedDisputeId || "-"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {selectedRecord?.disputeId?.status || "-"}
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleResolve}>
            <div className="space-y-2">
              <Label>Resolution</Label>
              <Select
                value={resolutionAction}
                onValueChange={(value: ResolutionActionValue) =>
                  setResolutionAction(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partial_refund">partial_refund</SelectItem>
                  <SelectItem value="vendor_credit">vendor_credit</SelectItem>
                  <SelectItem value="full_refund">full_refund</SelectItem>
                  <SelectItem value="deny">deny</SelectItem>
                  <SelectItem value="mediated">mediated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount-minor">amountMinor</Label>
              <Input
                id="amount-minor"
                placeholder="e.g. 32000"
                value={amountMinor}
                onChange={(event) => setAmountMinor(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">currency</Label>
              <Input
                id="currency"
                placeholder="GBP"
                value={currency}
                onChange={(event) =>
                  setCurrency(event.target.value.toUpperCase())
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-notes">notes</Label>
              <Textarea
                id="resolution-notes"
                placeholder="Optional admin note"
                value={resolutionNotes}
                onChange={(event) => setResolutionNotes(event.target.value)}
              />
            </div>

            {resolveFeedback && (
              <p className="text-sm text-muted-foreground">{resolveFeedback}</p>
            )}

            <Button
              type="submit"
              disabled={isResolvePending || !selectedDisputeId}
            >
              {isResolvePending ? "Resolving..." : "Resolve"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
