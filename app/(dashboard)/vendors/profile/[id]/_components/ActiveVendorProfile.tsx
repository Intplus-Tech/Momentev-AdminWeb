"use client";

import { VendorProfile, VendorService } from "@/lib/actions/vendors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveVendorOverview from "./ActiveVendorOverview";
import ActiveVendorBookings from "./ActiveVendorBookings";
import ActiveVendorEarnings from "./ActiveVendorEarnings";
import ActiveVendorReviews from "./ActiveVendorReviews";

interface Props {
  vendor: VendorProfile;
  services: VendorService[];
  specialties: any[];
}

export default function ActiveVendorProfile({ vendor, services, specialties }: Props) {
  return (
    <div className="bg-white p-6 sm:p-10">
      <Tabs defaultValue="overview" className="w-full">
        {/* TABS */}
        <div className="border-b border-gray-200 mb-8">
          <TabsList className="bg-transparent h-auto p-0 flex justify-start gap-8 w-full border-0 rounded-none overflow-x-auto">
            <TabsTrigger 
              value="overview" 
              className="relative -mb-[1px] pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="relative -mb-[1px] pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="earnings" 
              className="relative -mb-[1px] pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden"
            >
              Earnings
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="relative -mb-[1px] pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ActiveVendorOverview vendor={vendor} services={services} specialties={specialties} />
        </TabsContent>

        <TabsContent value="bookings" className="mt-0">
          <ActiveVendorBookings vendorId={vendor.id} />
        </TabsContent>

        <TabsContent value="earnings" className="mt-0">
          <ActiveVendorEarnings vendorId={vendor.id} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-0">
          <ActiveVendorReviews vendorId={vendor.id} />
        </TabsContent>

      </Tabs>
    </div>
  );
}
