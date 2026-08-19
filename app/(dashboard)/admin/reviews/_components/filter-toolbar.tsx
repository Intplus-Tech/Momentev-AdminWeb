"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  current?: { vendorId?: string | undefined; reviewerUserId?: string | undefined; isFlagged?: string | null; minRating?: string | undefined; maxRating?: string | undefined };
  onChange: (key: string, value: string | null) => void;
  onClear: () => void;
};

export default function FilterToolbar({ current = {}, onChange, onClear }: Props) {
  const [vendorId, setVendorId] = useState(current.vendorId ?? "");
  const [reviewerUserId, setReviewerUserId] = useState(current.reviewerUserId ?? "");
  const [minSel, setMinSel] = useState<string | undefined>(current.minRating ?? undefined);
  const [maxSel, setMaxSel] = useState<string | undefined>(current.maxRating ?? undefined);

  const handleApplyIds = () => {
    onChange("vendorId", vendorId.trim() ? vendorId.trim() : null);
    onChange("reviewerUserId", reviewerUserId.trim() ? reviewerUserId.trim() : null);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full">
        <div className="w-full sm:w-64 flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Paste vendor Id"
            value={vendorId}
            onChange={(e) => setVendorId(e.target.value)}
            className="h-9 bg-white"
          />
        </div>

        <div className="w-full sm:w-64 flex-1 min-w-[200px]">
          <Input
            type="text"
            placeholder="Paste customer Id"
            value={reviewerUserId}
            onChange={(e) => setReviewerUserId(e.target.value)}
            className="h-9 bg-white"
          />
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
            type="button"
            variant="secondary"
            size="sm"
            className="ml-2 transition-transform duration-150 active:scale-95 active:translate-y-px"
            onClick={() => {
              handleApplyIds();
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
