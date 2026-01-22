"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface ClientProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  signupDate: string;
  lastLogin: string;
  status: "Active" | "Suspended" | "Blocked";
  metrics: {
    totalBookings: number;
    totalSpend: number;
    avgBookingValue: number;
    repeatRate: number;
    disputes: number;
  };
}

export default function ClientProfilePage() {
  const { clientId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [client, setClient] = useState<ClientProfile | null>(null);

  useEffect(() => {
    async function fetchClient() {
      // 🔁 replace with real API later
      const mockClient: ClientProfile = {
        id: clientId as string,
        fullName: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+44 7911 11111",
        location: "London, UK",
        signupDate: "March 15, 2023",
        lastLogin: "Today, 10:30 GMT",
        status: "Active",
        metrics: {
          totalBookings: 3,
          totalSpend: 4830,
          avgBookingValue: 1610,
          repeatRate: 67,
          disputes: 1,
        },
      };

      setClient(mockClient);
    }

    fetchClient();
  }, [clientId]);

  if (!client) return null;

  /* ================= TAB HANDLER ================= */
  const goTo = (tab?: string) => {
    if (!tab) {
      router.push(`/clientprofile/${clientId}`);
    } else {
      router.push(`/clientprofile/${clientId}/${tab}`);
    }
  };

  const isActive = (path: string) => pathname.endsWith(path);

  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground"
        >
          ← Back
        </button>
        <h1 className="text-xl md:text-2xl font-semibold flex-1 text-center text-[#191919]">
          CLIENT PROFILE MANAGEMENT
        </h1>
      </div>

      <p className="text-center text-sm text-muted-foreground">{client.id}</p>

      <div className="bg-[#FFFFFF] w-full px-4 py-6 space-y-8">
        {/* Tabs */}
        <div className="flex gap-8 border-b text-sm">
          <span
            onClick={() => goTo()}
            className={`pb-2 cursor-pointer ${
              isActive(clientId as string)
                ? "border-b-2 border-red-500 font-medium"
                : ""
            }`}
          >
            Overview
          </span>

          <span onClick={() => goTo("bookings")} className="cursor-pointer">
            Bookings
          </span>

          <span onClick={() => goTo("spending")} className="cursor-pointer">
            Spending
          </span>

          <span onClick={() => goTo("reviews")} className="cursor-pointer">
            Reviews
          </span>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="space-y-4 py-6">
            <h3 className="font-medium">Quick Actions</h3>

            <div className="flex items-center gap-2">
              <Switch />
              <span>Temporarily Suspend Account</span>
            </div>

            <div className="flex items-center gap-2">
              <Switch />
              <span>Block Account</span>
            </div>
          </CardContent>
        </Card>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Metric title="Total Bookings" value={client.metrics.totalBookings} />
          <Metric
            title="Total Spend"
            value={`£${client.metrics.totalSpend.toLocaleString()}`}
          />
          <Metric
            title="Avg. Booking Value"
            value={`£${client.metrics.avgBookingValue.toLocaleString()}`}
            subtitle="Reviews: 247"
          />
          <Metric
            title="Repeat Rate"
            value={`${client.metrics.repeatRate}%`}
            subtitle="0.4% of bookings"
          />
          <Metric title="Disputes" value={client.metrics.disputes} />
        </div>

        {/* Basic Info */}
        <Card className="max-w-xl">
          <CardContent className="space-y-6 py-6">
            <h3 className="font-medium">Basic Information</h3>

            <Image
              src="/client-img.png"
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />

            <div className="text-sm space-y-1">
              <Info label="Full Name" value={client.fullName} />
              <Info label="Client ID" value={client.id} />
              <Info label="Email" value={client.email} />
              <Info label="Phone" value={client.phone} />
              <Info label="Location" value={client.location} />
              <Info label="Signup Date" value={client.signupDate} />
              <Info label="Last Login" value={client.lastLogin} />

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Account Status:</span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  {client.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ================= HELPERS ================= */

function Metric({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardContent className="py-6 space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}:</span> {value}
    </p>
  );
}
