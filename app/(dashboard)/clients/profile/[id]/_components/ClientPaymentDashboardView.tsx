"use client";

import { useEffect, useState } from "react";
import { CustomerPaymentDashboard, getClientPaymentDashboard } from "@/lib/actions/clients";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, CreditCard, DollarSign, TrendingUp, ShieldAlert, BadgeCheck } from "lucide-react";

interface Props {
  clientId: string;
}

const formatAmount = (minorValue: number, currencyCode: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(minorValue / 100);
};

export default function ClientPaymentDashboardView({ clientId }: Props) {
  const [data, setData] = useState<CustomerPaymentDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getClientPaymentDashboard(clientId);
        if (res.success && res.data) {
          setData(res.data);
        } else {
          setError(res.error || "Failed to load payment data");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-xl" />
          ))}
        </div>
        <div className="h-40 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="rounded-xl border-dashed border-red-200 bg-red-50/50 shadow-none">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
          <h3 className="text-sm font-medium text-red-800">Unable to load payment dashboard</h3>
          <p className="text-xs text-red-600 mt-1">{error || "Data unavailable"}</p>
        </CardContent>
      </Card>
    );
  }

  const { spendingSummary, paymentMethods, currency } = data;

  const PaymentMethodCard = ({ method, title, backup }: { method: any; title: string; backup?: boolean }) => {
    if (!method) {
      return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-dashed text-gray-400">
          <div className="p-3 rounded-full bg-gray-100">
            <CreditCard className="w-5 h-5 opacity-50" />
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs">No card on file</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-4 p-4 rounded-lg border \${backup ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className={`p-3 rounded-full \${backup ? 'bg-gray-200/50 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{method.brand.toUpperCase()} •••• {method.last4}</p>
            {method.isDefault && <BadgeCheck className="w-4 h-4 text-green-500" />}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">Expires {method.expMonth}/{method.expYear}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Lifetime Value</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {formatAmount(spendingSummary.totalLifetimeValueMinor, currency)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Monthly</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {formatAmount(spendingSummary.averageMonthlySpendMinor, currency)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Projected 12Mo</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {formatAmount(spendingSummary.projected12MonthValueMinor, currency)}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-gray-50 text-gray-600 rounded-lg shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Transaction</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {formatAmount(paymentMethods.averageTransactionMinor, currency)}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-[15px] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              Payment Methods
            </CardTitle>
            <CardDescription>Saved cards for future bookings</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <PaymentMethodCard method={paymentMethods.primary} title="Primary Card" />
            <PaymentMethodCard method={paymentMethods.backup} title="Backup Card" backup />
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-[15px] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-gray-400" />
              Risk Profile
            </CardTitle>
            <CardDescription>Overview of payment reliability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2 mt-1">
                  <span className="font-medium text-gray-700">Success Rate</span>
                  <span className="font-semibold text-green-600">{paymentMethods.successRatePct}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500" 
                    style={{ width: `\${paymentMethods.successRatePct}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                  <p className="text-xs text-red-600 font-medium uppercase tracking-wider mb-1">Failed Payments</p>
                  <p className="text-2xl font-bold text-red-700">{paymentMethods.failedPayments}</p>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium uppercase tracking-wider mb-1">Platform Commission</p>
                  <p className="text-lg font-bold text-amber-800">
                    {formatAmount(spendingSummary.platformCommissionEarnedMinor, currency)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
