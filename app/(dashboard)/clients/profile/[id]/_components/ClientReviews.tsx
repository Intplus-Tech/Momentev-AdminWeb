"use client";

import { useEffect, useState } from "react";
import { getClientReviews, CustomerReviewResponse } from "@/lib/actions/reviews";
import { Loader2 } from "lucide-react";
import ClientReviewsDataTable from "./client-reviews-data-table";
import { columns } from "./client-reviews-columns";

interface Props {
  clientId: string;
}

export default function ClientReviews({ clientId }: Props) {
  const [data, setData] = useState<CustomerReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // We could add pagination state here if needed, but for now we'll fetch a large batch
  // and handle pagination client-side like the other tables
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setError(null);
      try {
        const response = await getClientReviews(clientId, 1, 100);

        if (!response.success) {
          setError(response.error || "Failed to fetch reviews");
          return;
        }

        setData(response.data || []);
        setTotal(response.total || 0);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm min-h-[400px]">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-4" />
        <p className="text-gray-500 text-sm font-medium">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-red-100 shadow-sm min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-red-500 text-xl font-bold">!</span>
        </div>
        <p className="text-red-600 font-medium mb-1">Failed to load reviews</p>
        <p className="text-red-500/70 text-sm mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Client Reviews</h2>
          <p className="text-sm text-gray-500 mt-1">
            Reviews written by this client across all vendors
          </p>
        </div>
        {total > 0 && (
          <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 shadow-sm">
            Total Reviews: <span className="text-red-600 font-bold ml-1">{total}</span>
          </div>
        )}
      </div>
      
      <div className="p-0">
        <ClientReviewsDataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
