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
import { FileDown } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);

  // Controlled values synced FROM the URL on mount only
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [filterValue, setFilterValue] = useState(searchParams.get("filter") || "All");

  const debouncedSearch = useDebounce(searchValue, 500);

  // Track whether this is the first render — skip pushing on initial mount
  const isFirstRender = useRef(true);

  /**
   * Builds a new query string, merging the given key/value pair into the
   * current URL without reading `searchParams` from closure (avoids stale ref).
   */
  const buildQuery = useCallback(
    (updates: Record<string, string | null>) => {
      // Read the CURRENT params at call time — not at effect scheduling time
      const current = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value === "" || value === "All") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      }
      return current.toString();
    },
    [] // No deps — always reads live window.location.search
  );

  // Push search debounced value to URL (skip initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const query = buildQuery({ search: debouncedSearch || null, page: "1" });
    router.push(`${pathname}?${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]); // Intentionally exclude router/pathname/buildQuery to avoid loops

  // Handle filter
  const handleFilter = (value: string) => {
    setFilterValue(value);
    const query = buildQuery({ filter: value === "All" ? null : value, page: "1" });
    router.push(`${pathname}?${query}`);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Input
          placeholder="Search vendors..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Select value={filterValue} onValueChange={handleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <button className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#D9D9D9] text-[#718096] text-sm flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors whitespace-nowrap h-10">
            <FileDown className="text-[#A0AEC0] w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs uppercase tracking-wider h-11">
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
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-12 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No results match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
