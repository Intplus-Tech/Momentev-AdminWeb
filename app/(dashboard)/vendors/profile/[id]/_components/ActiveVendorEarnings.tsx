"use client";

import { useState, useEffect } from "react";
import { getVendorEarnings, EarningResponse } from "@/lib/actions/earnings";
import { EarningsDataTable } from "./earnings-data-table";
import { columns } from "./earnings-columns";

interface Props {
  vendorId: string;
}

export default function ActiveVendorEarnings({ vendorId }: Props) {
  return (
    <div className="py-6">
      <EarningsContent vendorId={vendorId} />
    </div>
  );
}

function EarningsContent({ vendorId }: { vendorId: string }) {
  const [data, setData] = useState<EarningResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEarnings() {
      setLoading(true);
      setError(null);
      try {
        const response = await getVendorEarnings(vendorId);

        if (!response.success) {
          setError(response.error || "Failed to fetch earnings");
          return;
        }

        // Response object shape for this endpoint has `earnings` array directly under `data`
        setData(response.data?.earnings || []);
        setTotal(response.total || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEarnings();
  }, [vendorId]);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading earnings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  // Passing the extracted `earnings` array to the data table
  return (
    <EarningsDataTable columns={columns} data={data} />
  );
}
