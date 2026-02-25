"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { EarningResponse } from "@/lib/actions/earnings";
import { format } from "date-fns";
import {
  Receipt,
  Tag,
  Hash,
  Info,
  Layers,
} from "lucide-react";

interface EarningDetailsModalProps {
  earning: EarningResponse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100);
};

export default function EarningDetailsModal({
  earning,
  open,
  onOpenChange,
}: EarningDetailsModalProps) {
  if (!earning) return null;

  const type = earning.type || "unknown";
  const status = earning.status || "unknown";
  const currency = earning.currency || "usd";

  let statusVariant = "outline";
  let statusClassName = "bg-gray-100 text-gray-700 hover:bg-gray-100 border-transparent";
  if (status === "available") {
    statusVariant = "secondary";
    statusClassName = "bg-green-100 text-green-700 hover:bg-green-100 border-transparent";
  } else if (status === "pending") {
    statusVariant = "secondary";
    statusClassName = "bg-orange-100 text-orange-700 hover:bg-orange-100 border-transparent";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gray-50/50">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-gray-500" />
                Transaction Details
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={statusVariant as any}
                  className={`px-2 py-0.5 tracking-wider text-[10px] uppercase ${statusClassName}`}
                >
                  {status}
                </Badge>
                <Badge
                  variant="outline"
                  className="font-medium text-gray-700 bg-gray-50 uppercase text-[10px] px-2 py-0.5 tracking-wider"
                >
                  {type.replace(/_/g, " ")}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(earning.net, currency)}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                Net Earnings
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column: Transaction Info */}
            <div className="space-y-6">
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                  General Information
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <InfoItem
                    icon={<Hash className="h-4 w-4" />}
                    label="Transaction ID"
                    value={earning.id}
                  />
                  <InfoItem
                    icon={<Hash className="h-4 w-4" />}
                    label="Source ID"
                    value={earning.source}
                  />
                  <InfoItem
                    icon={<Tag className="h-4 w-4" />}
                    label="Reporting Category"
                    value={earning.reporting_category.replace(/_/g, " ")}
                    capitalize
                  />
                  <InfoItem
                    icon={<Layers className="h-4 w-4" />}
                    label="Balance Type"
                    value={earning.balance_type}
                    capitalize
                  />
                </div>
                {earning.description && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {earning.description}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column: Financials */}
            <div className="space-y-6">
              <section>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400 mb-3">
                  Financial Breakdown
                </h4>
                <div className="rounded-lg border overflow-hidden">
                  <div className="divide-y">
                    <FinancialRow
                      label="Gross Amount"
                      value={formatCurrency(earning.amount, currency)}
                    />
                    
                    {/* Render individual fee details if present */}
                    {earning.fee_details && earning.fee_details.length > 0 ? (
                      earning.fee_details.map((feeDetail, index) => (
                        <FinancialRow
                          key={index}
                          label={`Fee: ${feeDetail.type.replace(/_/g, " ")}`}
                          value={`-${formatCurrency(feeDetail.amount, feeDetail.currency)}`}
                          muted
                          small
                        />
                      ))
                    ) : (
                      <FinancialRow
                        label="Total Fees"
                        value={earning.fee > 0 ? `-${formatCurrency(earning.fee, currency)}` : "—"}
                        muted
                      />
                    )}
                    
                    <FinancialRow
                      label="Net Amount"
                      value={formatCurrency(earning.net, currency)}
                      bold
                      success
                    />
                  </div>
                </div>
                {earning.exchange_rate && (
                  <div className="mt-2 text-xs text-gray-400">
                    Exchange Rate: {earning.exchange_rate}
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Timestamps */}
          <section className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                Created: {format(new Date(earning.created * 1000), "MMM d, yyyy 'at' h:mm a")}
              </span>
              <span>
                Available On: {format(new Date(earning.available_on * 1000), "MMM d, yyyy")}
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
  capitalize,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-sm font-medium text-gray-900 truncate ${capitalize ? "capitalize" : ""}`}>
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
  success,
  small,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  success?: boolean;
  small?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 ${bold ? "bg-gray-50" : ""} ${small ? "py-2 bg-gray-50/50" : ""}`}>
      <span
        className={`${small ? "text-xs" : "text-sm"} ${bold ? "font-semibold text-gray-900" : muted ? "text-gray-500" : "text-gray-700"} capitalize`}
      >
        {label}
      </span>
      <span
        className={`${small ? "text-xs" : "text-sm"} font-mono ${bold ? (success ? "font-bold text-green-600" : "font-bold text-gray-900") : muted ? "text-red-500" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
