"use client";

import { useState, useEffect } from "react";
import { getAdminClientBookings, BookingResponse } from "@/lib/actions/bookings";
import { DataTable } from "./client-bookings-data-table";
import { columns } from "./client-bookings-columns";

interface Props {
  clientId: string;
}

export default function ClientBookings({ clientId }: Props) {
  return (
    <div className="py-6">
      <BookingsContent clientId={clientId} />
    </div>
  );
}

function BookingsContent({ clientId }: { clientId: string }) {
  const [data, setData] = useState<BookingResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError(null);
      try {
        const response = await getAdminClientBookings(clientId, 1, 100);

        if (!response.success) {
          setError(response.error || "Failed to fetch bookings");
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

    fetchBookings();
  }, [clientId]);

  if (loading) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-gray-50 rounded-lg">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading bookings...</p>
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

  return (
    <DataTable columns={columns} data={data} />
  );
}
