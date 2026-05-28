export interface PendingPayoutItem {
  bookingId: string;
  paymentIntentId: string;
  paidAt: string;
  bookingStatus: string;
  amountMinor: number;
  commissionMinor: number;
  vendorPayoutMinor: number;
  currency: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  vendor: {
    _id: string;
    businessName: string;
    hasPayoutAccount: boolean;
    owner: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface PaginatedPendingPayouts {
  data: PendingPayoutItem[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}