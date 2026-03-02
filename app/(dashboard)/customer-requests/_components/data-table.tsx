"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerRequest } from "@/lib/actions/customer-requests";
import RequestDetailsModal from "./RequestDetailsModal";

interface CategoryOption {
  _id: string;
  name: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  categories?: CategoryOption[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  categories = [],
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);

  // Modal state
  const [selectedRequest, setSelectedRequest] =
    useState<CustomerRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Controlled values synced FROM the URL on mount only
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [statusValue, setStatusValue] = useState(
    searchParams.get("status") || "all"
  );
  const [categoryValue, setCategoryValue] = useState(
    searchParams.get("serviceCategoryId") || "all"
  );
  const [dateFrom, setDateFrom] = useState(
    searchParams.get("dateFrom") || ""
  );
  const [dateTo, setDateTo] = useState(searchParams.get("dateTo") || "");

  const debouncedSearch = useDebounce(searchValue, 500);

  // Track first render to skip pushing on initial mount
  const isFirstRender = useRef(true);

  /**
   * Builds a new query string, merging updates into the current URL.
   */
  const buildQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const current = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value === "" || value === "all") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }
      return current.toString();
    },
    []
  );

  // Push debounced search value to URL (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const query = buildQuery({ search: debouncedSearch || null, page: "1" });
    router.push(`${pathname}?${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleStatusFilter = (value: string) => {
    setStatusValue(value);
    const query = buildQuery({
      status: value === "all" ? null : value,
      page: "1",
    });
    router.push(`${pathname}?${query}`);
  };

  const handleCategoryFilter = (value: string) => {
    setCategoryValue(value);
    const query = buildQuery({
      serviceCategoryId: value === "all" ? null : value,
      page: "1",
    });
    router.push(`${pathname}?${query}`);
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value);
    const isoValue = value ? new Date(value).toISOString() : null;
    const query = buildQuery({ dateFrom: isoValue, page: "1" });
    router.push(`${pathname}?${query}`);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value);
    const isoValue = value ? new Date(value).toISOString() : null;
    const query = buildQuery({ dateTo: isoValue, page: "1" });
    router.push(`${pathname}?${query}`);
  };

  const hasActiveFilters =
    searchValue ||
    statusValue !== "all" ||
    categoryValue !== "all" ||
    dateFrom ||
    dateTo;

  const clearAllFilters = () => {
    setSearchValue("");
    setStatusValue("all");
    setCategoryValue("all");
    setDateFrom("");
    setDateTo("");
    router.push(pathname);
  };

  const handleRowClick = (row: TData) => {
    setSelectedRequest(row as unknown as CustomerRequest);
    setModalOpen(true);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4">
        {/* Row 1: Search + Status + Category */}
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search by title, location, description..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="max-w-sm"
          />
          <Select value={statusValue} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending_approval">Pending Approval</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {categories.length > 0 && (
            <Select value={categoryValue} onValueChange={handleCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Row 2: Date Range + Clear */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">
              From
            </label>
            <Input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
              className="w-[160px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">
              To
            </label>
            <Input
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
              className="w-[160px]"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-red-600"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs uppercase tracking-wider h-11"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-12 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No customer requests match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Modal */}
      <RequestDetailsModal
        request={selectedRequest}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
