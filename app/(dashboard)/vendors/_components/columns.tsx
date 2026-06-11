"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VendorProfile } from "@/lib/actions/vendors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
  Suspended: "bg-amber-100 text-amber-700",
  Banned: "bg-red-100 text-red-700",
};

export const columns: ColumnDef<VendorProfile>[] = [
  {
    id: "vendor",
    header: "Vendor",
    cell: ({ row }) => {
      const vendor = row.original;
      const businessName = vendor.businessProfile?.businessName || "Unnamed Vendor";
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{businessName}</span>
          <span className="text-gray-400 text-[10px] font-mono mt-0.5">ID: {vendor._id}</span>
        </div>
      );
    },
  },
  {
    id: "contactInfo",
    header: "Contact Info",
    cell: ({ row }) => {
      const vendor = row.original;
      const contactName = vendor.businessProfile?.contactInfo?.primaryContactName || "No Contact Name";
      const contactEmail = vendor.businessProfile?.contactInfo?.emailAddress || vendor.userId?.email || "No Email";
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-800">{contactName}</span>
          <span className="text-xs text-gray-500">{contactEmail}</span>
        </div>
      );
    },
  },
  {
    id: "category",
    header: "Category / Type",
    cell: ({ row }) => {
      const vendor = row.original;
      const bType = vendor.businessProfile?.businessRegType ? vendor.businessProfile.businessRegType.replace(/_/g, " ") : "N/A";
      return <span className="text-gray-500 text-sm capitalize">{bType}</span>;
    },
  },
  {
    id: "statusAndStage",
    header: "Status & Stage",
    cell: ({ row }) => {
      const vendor = row.original;
      const statusText = vendor.vendorStatus === "banned"
        ? "Banned"
        : vendor.vendorStatus === "suspended"
          ? "Suspended"
          : vendor.isActive
            ? "Active"
            : "Inactive";
      return (
        <div className="flex flex-col items-start gap-1.5">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyles[statusText]}`}>
            {statusText}
          </span>
          {!vendor.onBoarded && (
            <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded-sm">
              Stage: {vendor.onBoardingStage}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "commission",
    header: "Commission",
    cell: ({ row }) => {
      const vendor = row.original;
      let commissionDisplay = "N/A";
      if (vendor.commissionAgreement?.accepted && vendor.commissionAgreement.commissionAmount) {
        const amount = vendor.commissionAgreement.commissionAmount;
        const type = vendor.commissionAgreement.commissionType;
        commissionDisplay = type === 'percentage' ? `${amount}%` : `${amount} ${vendor.commissionAgreement.currency || ''}`;
      }
      return <span className="text-sm font-medium text-gray-700">{commissionDisplay}</span>;
    },
  },
  {
    id: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <div className="flex flex-col">
          <span>{vendor.rate} ★</span>
          <span className="text-[10px] text-gray-400">({vendor.reviewCount} revs)</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const vendor = row.original;
      return (
        <div className="flex space-x-2 whitespace-nowrap">
          <Button variant="link" className="p-0 h-auto text-xs text-[#2B4EFF]" asChild>
            <Link href={`/vendors/profile/${vendor._id}`}>View</Link>
          </Button>
        </div>
      );
    },
  },
];
