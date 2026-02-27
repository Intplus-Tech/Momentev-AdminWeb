"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingResponse } from "@/lib/actions/bookings";
import { format } from "date-fns";
import {
  CalendarDays,
  MapPin,
  Users,
  CreditCard,
  Clock,
  FileText,
} from "lucide-react";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  pending_payment: {
    label: "Pending Payment",
    color: "bg-orange-100 text-orange-800",
  },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800" },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

interface BookingDetailsModalProps {
  booking: BookingResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export default function BookingDetailsModal({
  booking,
  open,
  onOpenChange,
}: BookingDetailsModalProps) {
  if (!booking) return null;

  const status = booking.status || "pending";
  const config = statusConfig[status] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
  };
  const currency = booking.currency || "GBP";
  const customer = booking.customerId;
  const event = booking.eventDetails;
  const amounts = booking.amounts;
  const payment = booking.payment;
  const initials = `${customer?.firstName?.[0] || ""}${customer?.lastName?.[0] || ""}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gray-50/50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {event?.title || "Untitled Event"}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`border-transparent font-medium shadow-none ${config.color} uppercase text-[10px] px-2 py-0.5 tracking-wider`}
                >
                  {config.label}
                </Badge>
                <span className="text-xs text-gray-400">ID: {booking._id}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Customer Section */}
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                  Customer
                </h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={customer?.avatar}
                      alt={customer?.firstName}
                    />
                    <AvatarFallback className="text-sm bg-gray-200 text-gray-600">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 capitalize">
                      {customer?.firstName} {customer?.lastName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {customer?.email}
                    </span>
                  </div>
                </div>
              </section>

              {/* Event Details Section */}
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                  Event Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Start Date"
                    value={
                      event?.startDate
                        ? format(new Date(event.startDate), "MMM d, yyyy")
                        : "—"
                    }
                  />
                  <InfoItem
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="End Date"
                    value={
                      event?.endDate
                        ? format(new Date(event.endDate), "MMM d, yyyy")
                        : "—"
                    }
                  />
                  <InfoItem
                    icon={<Users className="h-4 w-4" />}
                    label="Guest Count"
                    value={event?.guestCount ? String(event.guestCount) : "—"}
                  />
                  <InfoItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="Location"
                    value={booking.location?.addressText || "—"}
                  />
                </div>
                {event?.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Financial Breakdown */}
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                  Financial Breakdown
                </h4>
                <div className="rounded-lg border overflow-hidden">
                  <div className="divide-y">
                    <FinancialRow
                      label="Subtotal"
                      value={formatCurrency(amounts?.subtotal || 0, currency)}
                    />
                    <FinancialRow
                      label="Fees"
                      value={formatCurrency(amounts?.fees || 0, currency)}
                      muted
                    />
                    <FinancialRow
                      label="Commission"
                      value={formatCurrency(amounts?.commission || 0, currency)}
                      muted
                    />
                    <FinancialRow
                      label="Total"
                      value={formatCurrency(amounts?.total || 0, currency)}
                      bold
                    />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span className="capitalize">
                    {booking.paymentModel?.replace(/_/g, " ") || "—"}
                  </span>
                </div>
              </section>

              {/* Payment Info */}
              {payment && (
                <section>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                    Payment
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InfoItem
                      icon={<CreditCard className="h-4 w-4" />}
                      label="Provider"
                      value={
                        payment.provider
                          ? payment.provider.charAt(0).toUpperCase() +
                            payment.provider.slice(1)
                          : "—"
                      }
                    />
                    <InfoItem
                      icon={<Clock className="h-4 w-4" />}
                      label="Payment Status"
                      value={
                        payment.status
                          ? payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1).replace(/_/g, " ")
                          : "—"
                      }
                    />
                  </div>
                  {payment.paymentIntentId && (
                    <p className="mt-2 text-xs text-gray-400 font-mono truncate">
                      Intent: {payment.paymentIntentId}
                    </p>
                  )}
                </section>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <section className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                Created:{" "}
                {format(new Date(booking.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
              <span>
                Updated:{" "}
                {format(new Date(booking.updatedAt), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Reusable info item
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-900 truncate">
          {value}
        </span>
      </div>
    </div>
  );
}

// Reusable financial row
function FinancialRow({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 ${bold ? "bg-gray-50" : ""}`}
    >
      <span
        className={`text-sm ${bold ? "font-semibold text-gray-900" : muted ? "text-gray-500" : "text-gray-700"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-mono ${bold ? "font-bold text-gray-900" : muted ? "text-gray-500" : "text-gray-700"}`}
      >
        {value}
      </span>
    </div>
  );
}
