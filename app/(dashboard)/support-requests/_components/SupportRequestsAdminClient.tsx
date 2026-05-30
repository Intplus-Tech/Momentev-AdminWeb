"use client";

import { useEffect, useState, useTransition } from "react";
import {
  SupportRequest,
  PaginatedSupportRequests,
  getSupportRequests,
  getSupportRequestById,
  updateSupportRequest,
  archiveSupportRequest,
  unarchiveSupportRequest,
  deleteSupportRequest,
} from "@/lib/actions/support-requests";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  X,
  Download,
  RefreshCw,
  ArchiveRestore,
  Trash2,
  Eye,
  Archive,
} from "lucide-react";
import { downloadCsv } from "@/lib/exportCsv";

// ─── Constants ────────────────────────────────────────────────────────────────

type StatusUpdate = "pending" | "in_progress" | "resolved" | string;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value?: string | null) {
  if (!value) return "–";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "–";
  return d.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status?.toLowerCase()) {
    case "pending":
      return "default";
    case "in_progress":
      return "secondary";
    case "resolved":
      return "outline";
    default:
      return "outline";
  }
}

function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "in_progress":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "resolved":
      return "bg-gray-100 text-gray-600 border-gray-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}

function formatStatusLabel(status?: string | null): string {
  if (!status) return "–";
  switch (status.toLowerCase()) {
    case "pending": return "Pending";
    case "in_progress": return "In Progress";
    case "resolved": return "Resolved";
    default: return status;
  }
}

function getDisplayName(
  req: SupportRequest,
): { fullName: string; email: string } {
  return {
    fullName: `${req.firstName} ${req.lastName}`.trim() || "–",
    email: req.email || "–",
  };
}

function getVendorLabel(
  vendorId: SupportRequest["vendorId"],
): string {
  if (!vendorId) return "–";
  if (typeof vendorId === "string") return vendorId;
  return vendorId.businessName || vendorId._id || "–";
}

function getClientLabel(
  clientId: SupportRequest["clientId"],
): string {
  if (!clientId) return "–";
  if (typeof clientId === "string") return clientId;
  const name =
    [clientId.firstName, clientId.lastName].filter(Boolean).join(" ").trim();
  return name || clientId.email || clientId._id || "–";
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SupportRequestsAdminClient() {
  // ── State ──
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [includeArchived, setIncludeArchived] = useState(false);

  const [listData, setListData] = useState<PaginatedSupportRequests>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
  });

  const [selectedRecord, setSelectedRecord] = useState<SupportRequest | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const [newStatus, setNewStatus] = useState<StatusUpdate>("pending");
  const [adminNotes, setAdminNotes] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [isListPending, startListTransition] = useTransition();
  const [isActionPending, startActionTransition] = useTransition();

  // ── Data loading ──
  const loadList = (targetPage?: number) => {
    const requestedPage = targetPage ?? page;

    startListTransition(async () => {
      setError(null);
      const result = await getSupportRequests({
        page: requestedPage,
        limit,
        includeArchived: includeArchived || undefined,
      });

      if (!result.success || !result.data) {
        setError(result.error || "Failed to load support requests.");
        return;
      }

      setListData(result.data);
    });
  };

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, includeArchived]);

  const applyFilters = () => {
    setPage(1);
    loadList(1);
  };

  const clearFilters = () => {
    setIncludeArchived(false);
    setPage(1);
    loadList(1);
  };

  const hasActiveFilters = includeArchived;

  const totalPages = Math.max(1, Math.ceil(listData.total / listData.limit));

  // ── Modal helpers ──
  const openDetails = async (rec: SupportRequest) => {
    // Fetch full record (may have populated vendor/client)
    startActionTransition(async () => {
      const result = await getSupportRequestById(rec._id);
      if (result.success && result.data) {
        setSelectedRecord(result.data);
      } else {
        setSelectedRecord(rec);
      }
    });
    setSelectedRecord(rec);
    setFeedback(null);
    setIsDetailsOpen(true);
  };

  const openUpdateStatus = (rec: SupportRequest) => {
    setSelectedRecord(rec);
    setNewStatus((rec.status as StatusUpdate) || "pending");
    setAdminNotes(rec.adminNotes || "");
    setFeedback(null);
    setIsUpdateStatusOpen(true);
    setIsDetailsOpen(false);
  };

  const openDeleteConfirm = (rec: SupportRequest) => {
    setSelectedRecord(rec);
    setIsDeleteConfirmOpen(true);
    setIsDetailsOpen(false);
  };

  // ── Actions ──
  const handleUpdateStatus = () => {
    if (!selectedRecord) return;
    startActionTransition(async () => {
      setFeedback(null);
      const result = await updateSupportRequest(selectedRecord._id, {
        status: newStatus,
        adminNotes: adminNotes.trim() || undefined,
      });
      if (!result.success) {
        setFeedback(result.error || "Failed to update status.");
        return;
      }
      setFeedback("Status updated successfully.");
      loadList();
    });
  };

  const handleArchive = (rec: SupportRequest) => {
    startActionTransition(async () => {
      setError(null);
      const result = await archiveSupportRequest(rec._id);
      if (!result.success) {
        setError(result.error || "Failed to archive request.");
        return;
      }
      loadList();
    });
    setIsDetailsOpen(false);
  };

  const handleUnarchive = (rec: SupportRequest) => {
    startActionTransition(async () => {
      setError(null);
      const result = await unarchiveSupportRequest(rec._id);
      if (!result.success) {
        setError(result.error || "Failed to restore request.");
        return;
      }
      loadList();
    });
    setIsDetailsOpen(false);
  };

  const handleDelete = () => {
    if (!selectedRecord) return;
    startActionTransition(async () => {
      setError(null);
      const result = await deleteSupportRequest(selectedRecord._id);
      if (!result.success) {
        setError(result.error || "Failed to delete request.");
        return;
      }
      setIsDeleteConfirmOpen(false);
      loadList();
    });
  };

  // ── CSV Export ──
  const handleExportCsv = () => {
    const rows = listData.data.map((r) => {
      const { fullName, email } = getDisplayName(r);
      return {
        ID: r._id,
        "Full Name": fullName,
        Email: email,
        Status: r.status,
        Message: r.message,
        "Vendor": getVendorLabel(r.vendorId),
        "Client": getClientLabel(r.clientId),
        "Archived At": r.archivedAt || "",
        "Created At": r.createdAt,
      };
    });
    downloadCsv(
      rows,
      `support_requests_${new Date().toISOString().split("T")[0]}`,
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-3 w-full">
            {/* Include archived toggle */}
            {/* <div className="flex items-center gap-2">
              <input
                id="include-archived"
                type="checkbox"
                checked={includeArchived}
                onChange={(e) => {
                  setIncludeArchived(e.target.checked);
                  setPage(1);
                }}
                className="rounded border-gray-300"
              />
              <label
                htmlFor="include-archived"
                className="text-sm font-medium text-gray-600 select-none cursor-pointer"
              >
                Include archived
              </label>
            </div> */}

            {/* <Button
              variant="secondary"
              size="sm"
              className="h-9"
              onClick={applyFilters}
              disabled={isListPending}
            >
              Apply
            </Button> */}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                disabled={isListPending}
                className="text-gray-500 hover:text-red-600"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}

            <div className="flex-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadList()}
              disabled={isListPending}
              className="h-9"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isListPending ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              disabled={isListPending || listData.data.length === 0}
              className="h-9"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="px-4 pt-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto relative min-h-[360px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Name
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Email
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Vendor
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Client
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap">
                  Created
                </TableHead>
                <TableHead className="font-medium text-gray-500 whitespace-nowrap w-12">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isListPending ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    Loading support requests…
                  </TableCell>
                </TableRow>
              ) : listData.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500"
                  >
                    No support requests found.
                  </TableCell>
                </TableRow>
              ) : (
                listData.data.map((req) => {
                  const { fullName, email } = getDisplayName(req);
                  const isArchived = Boolean(req.archivedAt);
                  return (
                    <TableRow
                      key={req._id}
                      className={`hover:bg-gray-50/50 cursor-pointer ${isArchived ? "opacity-60" : ""}`}
                    >
                      <TableCell className="font-medium whitespace-nowrap">
                        {fullName}
                        {isArchived && (
                          <span className="ml-1 text-[10px] text-gray-400 font-normal">
                            (archived)
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-600 whitespace-nowrap">
                        {email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] font-semibold uppercase tracking-wider border ${getStatusColor(req.status)}`}
                          variant="outline"
                        >
                          {formatStatusLabel(req.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 whitespace-nowrap max-w-[140px] truncate">
                        {getVendorLabel(req.vendorId)}
                      </TableCell>
                      <TableCell className="text-gray-600 whitespace-nowrap max-w-[140px] truncate">
                        {getClientLabel(req.clientId)}
                      </TableCell>
                      <TableCell className="text-gray-500 whitespace-nowrap text-sm">
                        {formatDate(req.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => openDetails(req)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openUpdateStatus(req)}
                            >
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* {isArchived ? (
                              <DropdownMenuItem
                                onClick={() => handleUnarchive(req)}
                                disabled={isActionPending}
                              >
                                <ArchiveRestore className="h-4 w-4 mr-2" />
                                Restore
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleArchive(req)}
                                disabled={isActionPending}
                              >
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                            )} */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteConfirm(req)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
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

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Total: {listData.total} | Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const next = Math.max(1, page - 1);
                setPage(next);
                loadList(next);
              }}
              disabled={page <= 1 || isListPending}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const next = Math.min(totalPages, page + 1);
                setPage(next);
                loadList(next);
              }}
              disabled={page >= totalPages || isListPending}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* ── Details Modal ── */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Support Request Details</DialogTitle>
            <DialogDescription>
              Full information for this support request.
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-4 py-2 text-sm">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Name
                  </p>
                  <p>{getDisplayName(selectedRecord).fullName}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p>{selectedRecord.email || "–"}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Status
                  </p>
                  <Badge
                    className={`text-[10px] font-semibold uppercase tracking-wider border ${getStatusColor(selectedRecord.status)}`}
                    variant="outline"
                  >
                    {formatStatusLabel(selectedRecord.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    ID
                  </p>
                  <p className="font-mono text-xs text-gray-500 truncate">
                    {selectedRecord._id}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Vendor
                  </p>
                  <p>{getVendorLabel(selectedRecord.vendorId)}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Client
                  </p>
                  <p>{getClientLabel(selectedRecord.clientId)}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Created
                  </p>
                  <p>{formatDate(selectedRecord.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                    Updated
                  </p>
                  <p>{formatDate(selectedRecord.updatedAt)}</p>
                </div>
                {/* {selectedRecord.archivedAt && (
                  <>
                    <div>
                      <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                        Archived At
                      </p>
                      <p>{formatDate(selectedRecord.archivedAt)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                        Archived By
                      </p>
                      <p className="font-mono text-xs text-gray-500">
                        {selectedRecord.archivedBy || "–"}
                      </p>
                    </div>
                  </>
                )} */}
              </div>

              <div className="pt-3 border-t">
                <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-2">
                  Message
                </p>
                <p className="bg-gray-50 rounded-md p-3 text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedRecord.message || "No message provided."}
                </p>
              </div>

              {selectedRecord.adminNotes && (
                <div className="pt-3 border-t">
                  <p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-2">
                    Admin Notes
                  </p>
                  <p className="bg-amber-50 border border-amber-100 rounded-md p-3 text-amber-900 whitespace-pre-wrap leading-relaxed">
                    {selectedRecord.adminNotes}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
                {/* {selectedRecord.archivedAt ? (
                  <Button
                    variant="secondary"
                    disabled={isActionPending}
                    onClick={() => handleUnarchive(selectedRecord)}
                  >
                    <ArchiveRestore className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    disabled={isActionPending}
                    onClick={() => handleArchive(selectedRecord)}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                )} */}
                <Button
                  disabled={isActionPending}
                  onClick={() => openUpdateStatus(selectedRecord)}
                >
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Update Status Modal ── */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Change the status of this support request.
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-4 py-2">
              <div className="rounded-md border p-3 text-sm space-y-1">
                <p>
                  <span className="font-medium">From: </span>
                  {getDisplayName(selectedRecord).fullName}
                </p>
                <p>
                  <span className="font-medium">Current status: </span>
                  {formatStatusLabel(selectedRecord.status)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-status">New Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={(v: StatusUpdate) => setNewStatus(v)}
                >
                  <SelectTrigger id="new-status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Internal notes about the resolution..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {feedback && (
                <p
                  className={`text-sm ${feedback.includes("success") ? "text-green-600" : "text-destructive"}`}
                >
                  {feedback}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsUpdateStatusOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={isActionPending || (newStatus === selectedRecord.status && adminNotes.trim() === (selectedRecord.adminNotes || "").trim())}
                >
                  {isActionPending ? "Saving…" : "Save Status"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Hard Delete Confirm ── */}
      <AlertDialog
        open={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Support Request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone. The support request
              from{" "}
              <span className="font-semibold">
                {selectedRecord
                  ? getDisplayName(selectedRecord).fullName
                  : "this user"}
              </span>{" "}
              will be removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isActionPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isActionPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
