"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  User,
  Briefcase,
  CreditCard,
  Clock,
  Info,
  Loader2
} from "lucide-react";
import { AdminBookingItem, releaseBookingPayout, refundBookingPayment } from "@/lib/actions/bookings";
import { getAdminVendorById, getAdminVendorSpecialties } from "@/lib/actions/vendors";
import { format } from "date-fns";

interface BookingDetailsModalProps {
  booking: AdminBookingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  pending_payment: "bg-blue-100 text-blue-700 border-blue-200",
  paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingDetailsModal({
  booking,
  open,
  onOpenChange,
}: BookingDetailsModalProps) {
  const [vendorName, setVendorName] = useState<string | null>(null);
  const [specialtyNames, setSpecialtyNames] = useState<Record<string, string>>({});
  const [isLoadingExtra, setIsLoadingExtra] = useState(false);
  const [isReleasing, setIsReleasing] = useState(false);
  const [isRefunding, setIsRefunding] = useState(false);

  useEffect(() => {
    if (open && booking?.vendorId?._id) {
      const fetchExtraDetails = async () => {
        setIsLoadingExtra(true);
        try {
          const vendorId = booking.vendorId._id;
          const [vendorRes, specialtiesRes] = await Promise.all([
            getAdminVendorById(vendorId),
            getAdminVendorSpecialties(vendorId)
          ]);

          if (vendorRes.success && vendorRes.data) {
            setVendorName(vendorRes.data.businessProfile?.businessName || null);
          }

          if (specialtiesRes.success && specialtiesRes.data) {
            const namesMap: Record<string, string> = {};
            specialtiesRes.data.forEach(spec => {
              if (spec._id && spec.serviceSpecialty?.name) {
                namesMap[spec._id] = spec.serviceSpecialty.name;
              }
            });
            setSpecialtyNames(namesMap);
          }
        } catch (error) {
          console.error("Failed to load extra details:", error);
        } finally {
          setIsLoadingExtra(false);
        }
      };

      fetchExtraDetails();
    } else {
      setVendorName(null);
      setSpecialtyNames({});
    }
  }, [open, booking]);

  const handleReleasePayout = async () => {
    if (!booking?._id) return;
    setIsReleasing(true);
    try {
      const res = await releaseBookingPayout(booking._id);
      if (res.success) {
        toast.success("Payout released successfully");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Failed to release payout");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsReleasing(false);
    }
  };

  const handleRefundPayment = async () => {
    if (!booking?._id) return;
    
    const input = window.prompt("Enter refund amount in minor units (e.g., 54900 for $549.00). Leave blank to refund the FULL amount.");
    if (input === null) return; // User cancelled

    let amount: number | undefined = undefined;
    if (input.trim() !== "") {
      amount = parseInt(input.trim(), 10);
      if (isNaN(amount) || amount <= 0) {
        toast.error("Invalid amount. Please enter a valid number.");
        return;
      }
    }

    setIsRefunding(true);
    try {
      const res = await refundBookingPayment(booking._id, amount);
      if (res.success) {
        toast.success("Refund created successfully");
        onOpenChange(false);
      } else {
        toast.error(res.error || "Failed to create refund");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsRefunding(false);
    }
  };

  if (!booking) return null;

  const event = booking.eventDetails;
  const customer = booking.customerId;
  const vendor = booking.vendorId;
  const amounts = booking.amounts;
  const payment = booking.payment;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl">
                  {event?.title || "Booking Details"}
                </DialogTitle>
                <Badge
                  variant="outline"
                  className={`rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                    statusStyles[booking.status] ||
                    "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {booking.status?.replace(/_/g, " ")}
                </Badge>
              </div>
              <DialogDescription className="sr-only">Detailed view of the selected booking</DialogDescription>
            </div>

            <div className="flex items-center gap-2">
              {booking.payment?.status === "succeeded" && booking.status !== "cancelled" && (
                <Button 
                  onClick={handleRefundPayment} 
                  disabled={isRefunding || isReleasing}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 shrink-0"
                >
                  {isRefunding ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Refunding...
                    </>
                  ) : (
                    "Refund"
                  )}
                </Button>
              )}

              {booking.paymentModel === "split_payout" && booking.status !== "completed" && booking.status !== "cancelled" && booking.payment?.status === "succeeded" && (
                <Button 
                  onClick={handleReleasePayout} 
                  disabled={isReleasing || isRefunding}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                >
                  {isReleasing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Releasing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Release Payout
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ── Customer Info ── */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                  <User className="w-3 h-3" />
                </div>
                Customer Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-right">
                    {customer?.firstName} {customer?.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Email</span>
                  <span
                    className="font-medium text-right truncate max-w-[150px]"
                    title={customer?.email}
                  >
                    {customer?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">
                    {customer?.phoneNumber || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-gray-500">Status</span>
                  <span className="capitalize font-medium text-green-600">
                    {customer?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Vendor Info ── */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-full text-purple-600">
                  <Briefcase className="w-3 h-3" />
                </div>
                Vendor Details
              </h3>
              <div className="space-y-2 text-sm">

                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Business Name</span>
                  <span className="font-medium text-right max-w-[150px]">
                    {isLoadingExtra ? (
                      <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                    ) : (
                      <span className="truncate block" title={vendorName || vendor?.businessProfile || ""}>
                        {vendorName || vendor?.businessProfile || "—"}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-gray-500">Reviews</span>
                  <span className="font-medium">
                    {vendor?.reviewCount} ({vendor?.rate} ★)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Financial Details ── */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                <DollarSign className="w-3 h-3" />
              </div>
              Financial & Payment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Currency</span>
                  <span className="font-medium uppercase">
                    {booking.currency}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    {amounts?.subtotal?.toLocaleString(undefined, { style: "currency", currency: booking.currency || "GBP" })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Fees</span>
                  <span className="font-medium">
                    {amounts?.fees?.toLocaleString(undefined, { style: "currency", currency: booking.currency || "GBP" })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Commission</span>
                  <span className="font-medium text-amber-600">
                    {amounts?.commission?.toLocaleString(undefined, { style: "currency", currency: booking.currency || "GBP" })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1 font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-emerald-700">
                    {amounts?.total?.toLocaleString(undefined, { style: "currency", currency: booking.currency || "GBP" })}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Payment Model</span>
                  <span className="font-medium capitalize">
                    {booking.paymentModel?.replace(/_/g, " ")}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Provider</span>
                  <span className="font-medium capitalize">
                    {payment?.provider || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Payment Status</span>
                  <span className={`font-medium capitalize ${payment?.status === "succeeded" ? "text-emerald-600" : "text-amber-600"}`}>
                    {payment?.status || "—"}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-1">
                  <span className="text-gray-500">Paid At</span>
                  <span className="font-medium">
                    {payment?.paidAt ? formatDate(payment.paidAt) : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Budget Allocations */}
            {booking.budgetAllocations && booking.budgetAllocations.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                 <span className="text-gray-500 text-xs block mb-2 uppercase tracking-wider font-semibold">
                    Budget Allocations
                 </span>
                 <div className="space-y-2">
                    {booking.budgetAllocations.map((alloc, idx) => (
                       <div key={idx} className="flex justify-between bg-white border border-gray-100 p-2 rounded items-center">
                          <div className="flex flex-col">
                             <div className="flex items-center gap-2">
                               <span className="text-xs font-medium text-gray-700">
                                 {specialtyNames[alloc.vendorSpecialtyId?._id] || "Specialty"}
                               </span>
                               {isLoadingExtra && (
                                 <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                               )}
                             </div>
                             {!specialtyNames[alloc.vendorSpecialtyId?._id] && !isLoadingExtra && (
                                <span className="text-[10px] text-gray-400 italic">Unknown Specialty</span>
                             )}
                             <span className="text-[10px] text-gray-400 capitalize flex items-center gap-1">
                                <Info className="w-3 h-3" />
                                {alloc.vendorSpecialtyId?.priceCharge?.replace(/_/g, " ")} @ {alloc.vendorSpecialtyId?.price}
                             </span>
                          </div>
                          <Badge variant="secondary" className="font-medium bg-gray-50">
                             {alloc.budgetedAmount?.toLocaleString(undefined, { style: "currency", currency: booking.currency || "GBP" })}
                          </Badge>
                       </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* ── Event Details ── */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 rounded-full text-amber-600">
                 <Calendar className="w-3 h-3" />
              </div>
              Event Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs block mb-0.5">
                    Dates
                  </span>
                  <span className="font-medium block leading-tight text-xs">
                    {event?.startDate ? formatDate(event.startDate) : "—"}
                    <br />
                    <span className="text-gray-400">to</span>
                    <br />
                    {event?.endDate ? formatDate(event.endDate) : "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-md shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-gray-500 text-xs block mb-0.5">
                    Location
                  </span>
                  <span
                    className="font-medium block text-sm"
                  >
                    {booking.location?.addressText || "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-md shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs block mb-0.5">
                    Guests Expected
                  </span>
                  <span className="font-medium text-sm">
                    {event?.guestCount?.toLocaleString() || "—"}
                  </span>
                </div>
              </div>
            </div>

            {event?.description && (
              <div className="mt-4">
                <span className="text-gray-500 text-xs block mb-1.5 font-medium uppercase tracking-wider">
                  Description
                </span>
                <div className="text-gray-700 bg-white border border-gray-100 shadow-sm rounded-md p-3 text-sm leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </div>
              </div>
            )}
          </div>

          {/* ── Timestamps ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-2 bg-gray-50/50 p-3 rounded-md text-[11px] text-gray-500 font-mono border border-gray-100">
            <span className="flex items-center gap-1.5">
              <span className="text-gray-400">Created:</span>
              {formatDate(booking.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gray-400">Updated:</span>
              {formatDate(booking.updatedAt)}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
