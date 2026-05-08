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
    setDateFrom(e.target.value);
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
  };

  const applyDateFilter = () => {
    const isoFrom = dateFrom ? new Date(dateFrom).toISOString() : null;
    const isoTo = dateTo ? new Date(dateTo).toISOString() : null;
    const query = buildQuery({ dateFrom: isoFrom, dateTo: isoTo, page: "1" });
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col gap-4 bg-gray-50/50">
        {/* Row 1: Search + Status + Category */}
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search by title, location, description..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="max-w-sm h-9 bg-white"
          />
          <Select value={statusValue} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px] h-9 bg-white">
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
              <SelectTrigger className="w-[200px] h-9 bg-white">
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
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">From:</span>
            <Input
              type="date"
              value={dateFrom}
              onChange={handleDateFromChange}
              className="w-[160px] h-9 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">To:</span>
            <Input
              type="date"
              value={dateTo}
              onChange={handleDateToChange}
              className="w-[160px] h-9 bg-white"
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={applyDateFilter}
            className="h-9"
          >
            Apply
          </Button>

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
      <div className="overflow-x-auto relative min-h-[400px]">
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
