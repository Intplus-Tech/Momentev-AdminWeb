"use client";

import { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { getAdminVendors } from "@/lib/actions/vendors";
import { getAdminClients } from "@/lib/actions/clients";
import { useDebounce } from "@/hooks/use-debounce";

type Props = {
  current?: { vendorId?: string | undefined; reviewerUserId?: string | undefined; isFlagged?: string | null; minRating?: string | undefined; maxRating?: string | undefined };
  onChange: (key: string, value: string | null) => void;
  onClear: () => void;
};

export default function FilterToolbar({ current = {}, onChange, onClear }: Props) {
  const [vendorQuery, setVendorQuery] = useState("");
  const [customerQuery, setCustomerQuery] = useState("");
  const debouncedVendor = useDebounce(vendorQuery, 400);
  const debouncedCustomer = useDebounce(customerQuery, 400);

  const [vendorResults, setVendorResults] = useState<any[]>([]);
  const [customerResults, setCustomerResults] = useState<any[]>([]);
  const [minSel, setMinSel] = useState<string | undefined>(current.minRating ?? undefined);
  const [maxSel, setMaxSel] = useState<string | undefined>(current.maxRating ?? undefined);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!debouncedVendor) {
        setVendorResults([]);
        return;
      }
      const res = await getAdminVendors(1, 10, debouncedVendor);
      if (mounted && res.success && res.data?.data) {
        setVendorResults(res.data.data);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [debouncedVendor]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!debouncedCustomer) {
        setCustomerResults([]);
        return;
      }
      const res = await getAdminClients(1, 10, debouncedCustomer);
      if (mounted && res.success && res.data) {
        setCustomerResults(res.data);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [debouncedCustomer]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3 w-full">
        <div className="w-full sm:w-80">
          <Combobox>
            <ComboboxInput
              placeholder="Search vendor..."
              value={vendorQuery}
              onValueChange={(v: string) => setVendorQuery(v)}
              showClear
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>No vendors</ComboboxEmpty>
                {vendorResults.map((v) => (
                  <ComboboxItem
                    key={v._id}
                    value={v._id}
                    onSelect={() => onChange("vendorId", v._id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{v.businessProfile?.businessName || `${v.userId?.firstName} ${v.userId?.lastName}`}</span>
                      <span className="text-xs text-gray-500">{v.userId?.email}</span>
                    </div>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="w-full sm:w-80">
          <Combobox>
            <ComboboxInput
              placeholder="Search customer..."
              value={customerQuery}
              onValueChange={(v: string) => setCustomerQuery(v)}
              showClear
            />
            <ComboboxContent>
              <ComboboxList>
                <ComboboxEmpty>No customers</ComboboxEmpty>
                {customerResults.map((c) => (
                  <ComboboxItem
                    key={c._id}
                    value={c._id}
                    onSelect={() => onChange("reviewerUserId", c._id)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{c.firstName} {c.lastName}</span>
                      <span className="text-xs text-gray-500">{c.email}</span>
                    </div>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        <div className="flex items-center gap-2">
          <select
            className="border rounded-md h-8 px-2"
            value={current.isFlagged ?? ""}
            onChange={(e) => onChange("isFlagged", e.target.value === "" ? null : e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Flagged</option>
            <option value="false">Not Flagged</option>
          </select>

          <select
            className="w-20 border rounded-md h-8 px-2"
            value={minSel ?? ""}
            onChange={(e) => setMinSel(e.target.value === "" ? undefined : e.target.value)}
          >
            <option value="">Min</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <select
            className="w-20 border rounded-md h-8 px-2"
            value={maxSel ?? ""}
            onChange={(e) => setMaxSel(e.target.value === "" ? undefined : e.target.value)}
          >
            <option value="">Max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <Button
            size="sm"
            className="ml-2"
            onClick={() => {
              onChange("minRating", minSel ?? null);
              onChange("maxRating", maxSel ?? null);
            }}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onClear}>Clear Filters</Button>
      </div>
    </div>
  );
}
