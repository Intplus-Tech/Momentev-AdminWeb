import { FileDown } from "lucide-react";
import ActivePagination from "./_components/ActivePagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAdminVendors, VendorProfile } from "@/lib/actions/vendors";
import VendorFilterTabs from "./_components/VendorFilterTabs";
import { Search } from "lucide-react";

/* ================= STYLES ================= */
const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

interface PageProps {
  searchParams: {
    page?: string;
    filter?: string;
    search?: string;
  };
}

export default async function VendorPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const currentFilter = resolvedParams.filter || "All";
  const currentSearch = resolvedParams.search || "";
  
  // Map "Active" / "Inactive" filters to boolean for the database
  let isActiveFilter: boolean | undefined = undefined;
  if (currentFilter === "Active") isActiveFilter = true;
  if (currentFilter === "Inactive") isActiveFilter = false;

  const result = await getAdminVendors(currentPage, 20, currentSearch, isActiveFilter, undefined);
  const data = result.success ? result.data : null;
  const totalVendors = data?.total || 0;
  
  const displayVendors = data?.data || [];

  // If using a unified endpoint with pagination, we only have the total count for the CURRENT filter.
  // To avoid firing 3 queries on every page load just to get counts, we'll display the count of the ACTIVE filter tab only.
  // The backend could be updated to return global aggregates (e.g. `meta: { active: 10, inactive: 5 }`), but for now, we just rely on totalVendors.
  const activeCountLabel = currentFilter === "Active" ? `(${totalVendors})` : "";
  const inactiveCountLabel = currentFilter === "Inactive" ? `(${totalVendors})` : "";
  const allCountLabel = currentFilter === "All" ? `(${totalVendors})` : "";

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Vendor Management</h1>
        <p className="text-muted-foreground text-sm">
          {totalVendors} Total Registered Vendors
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="w-full sm:flex-1 overflow-x-auto">
          <VendorFilterTabs 
            currentFilter={currentFilter}
            allCountLabel={currentFilter === "All" ? `(${totalVendors})` : ""}
            activeCountLabel={activeCountLabel}
            inactiveCountLabel={inactiveCountLabel}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Basic form to submit search query */}
          <form className="relative w-full sm:w-64" action="">
            <input type="hidden" name="filter" value={currentFilter} />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Search vendors..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#2B4EFF]"
            />
          </form>

          <button className="px-4 py-2 rounded-lg bg-[#D9D9D9] text-[#718096] text-sm flex items-center gap-2 hover:bg-gray-300 transition-colors whitespace-nowrap">
            <FileDown className="text-[#A0AEC0] w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        {data ? (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-gray-500 font-medium whitespace-nowrap">
                  <th className="p-4">Vendor</th>
                  <th>Contact Info</th>
                  <th>Category / Type</th>
                  <th>Status & Stage</th>
                  <th>Commission</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayVendors.length > 0 ? (
                  displayVendors.map((vendor) => {
                    const statusText = vendor.isActive ? "Active" : "Inactive";
                    const businessName = vendor.businessProfile?.businessName || "Unnamed Vendor";
                    const contactName = vendor.businessProfile?.contactInfo?.primaryContactName || "No Contact Name";
                    const contactEmail = vendor.businessProfile?.contactInfo?.emailAddress || vendor.userId?.email || "No Email";
                    const bType = vendor.businessProfile?.businessRegType ? vendor.businessProfile.businessRegType.replace(/_/g, " ") : "N/A";
                    
                    let commissionDisplay = "N/A";
                    if (vendor.commissionAgreement?.accepted && vendor.commissionAgreement.commissionAmount) {
                      const amount = vendor.commissionAgreement.commissionAmount;
                      const type = vendor.commissionAgreement.commissionType;
                      commissionDisplay = type === 'percentage' ? `${amount}%` : `${amount} ${vendor.commissionAgreement.currency || ''}`;
                    }
                    
                    return (
                      <tr
                        key={vendor._id}
                        className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
                      >
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{businessName}</span>
                            <span className="text-gray-400 text-[10px] font-mono mt-0.5">ID: {vendor._id}</span>
                          </div>
                        </td>
                        <td className="py-2 pr-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-800">{contactName}</span>
                            <span className="text-xs text-gray-500">{contactEmail}</span>
                          </div>
                        </td>
                        <td className="py-2 pr-4 text-gray-500 text-sm capitalize">{bType}</td>
                        <td className="py-2 pr-4">
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
                        </td>
                        <td className="py-2 pr-4 text-sm font-medium text-gray-700">
                           {commissionDisplay}
                        </td>
                        <td className="py-2 pr-4 text-gray-600 text-sm">
                          <div className="flex flex-col">
                            <span>{vendor.rate} ★</span>
                            <span className="text-[10px] text-gray-400">({vendor.reviewCount} revs)</span>
                          </div>
                        </td>
                        <td className="py-2 pr-4 text-[#2B4EFF] space-x-2 whitespace-nowrap">
                          <Button variant="link" className="p-0 h-auto text-xs">Edit</Button>
                          <Button variant="link" className="p-0 h-auto text-xs" asChild>
                            <Link href={`/vendors/profile/${vendor._id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No vendors found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-red-500">
            Failed to load vendors: {result.error}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {data && data.total > 0 && (
        <ActivePagination 
          currentPage={data.page || 1} 
          totalPages={Math.ceil(data.total / (data.limit || 20))} 
        />
      )}
    </div>
  );
}
