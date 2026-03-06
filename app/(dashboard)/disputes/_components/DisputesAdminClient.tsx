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
import { MoreHorizontal } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>Dispute Resolutions</CardTitle>
          <CardDescription>
            Open any dispute record and take escalation or resolution action
            from the dispute modal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label>Resolution Filter</Label>
              <Select
                value={resolutionFilter}
                onValueChange={(value: ResolutionFilterValue) => {
                  setResolutionFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full">
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

            <div className="space-y-2">
              <Label htmlFor="vendor-id-filter">vendorId</Label>
              <Input
                id="vendor-id-filter"
                placeholder="Vendor ObjectId"
                value={vendorId}
                onChange={(event) => setVendorId(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-filter">from</Label>
              <Input
                id="from-filter"
                type="datetime-local"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-filter">to</Label>
              <Input
                id="to-filter"
                type="datetime-local"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
              />
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={applyFilters} disabled={isTablePending}>
                Apply
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setVendorId("");
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                  loadResolutions(1);
                }}
                disabled={isTablePending}
              >
                Clear
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Dispute Status</TableHead>
                <TableHead>Resolution</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Resolved By</TableHead>
                <TableHead>Resolved At</TableHead>
                <TableHead>Action</TableHead>
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
                              variant="outline"
                              size="icon-sm"
                              disabled={isActionDisabled}
                              aria-label="More actions"
                              className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                            >
                              <MoreHorizontal className="size-4" />
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

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Total: {resolutionsPage.total} | Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={page <= 1 || isTablePending}
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={page >= totalPages || isTablePending}
                onClick={() => setPage((previous) => previous + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
