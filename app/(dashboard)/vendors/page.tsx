import { FileDown } from "lucide-react";
import ActivePagination from "./_components/ActivePagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getVendors, VendorProfile } from "@/lib/actions/vendors";

/* ================= STYLES ================= */
const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

interface PageProps {
  searchParams: {
    page?: string;
    filter?: string;
  };
}

/* ================= PAGE ================= */
export default async function VendorPage({ searchParams }: PageProps) {
  // Await searchParams as required in Next 15+
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const currentFilter = resolvedParams.filter || "All";
  
  const result = await getVendors(currentPage, 20);
  const data = result.success ? result.data : null;
  const totalVendors = data?.total || 0;
  
  // Apply visual filtering on the server (if backend doesn't support active/inactive filtering)
  let displayVendors = data?.data || [];
  
  if (currentFilter === "Active") {
    displayVendors = displayVendors.filter(v => v.isActive);
  } else if (currentFilter === "Inactive") {
    displayVendors = displayVendors.filter(v => !v.isActive);
  }

  // Count active vs inactive for the tabs
  const allCount = data?.data.length || 0;
  const activeCount = data?.data.filter(v => v.isActive).length || 0;
  const inactiveCount = data?.data.filter(v => !v.isActive).length || 0;

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
          <div className="flex items-center gap-6 sm:gap-10 text-[13px] bg-[#D9D9D9] p-2 rounded-lg min-w-max">
            <Link
              href="?filter=All"
              className={`font-medium p-1 px-2 rounded-lg cursor-pointer ${currentFilter === "All" ? "text-[#2B4EFF] bg-white" : "text-[#718096]"}`}
            >
              All <span className="pl-3">({allCount})</span>
            </Link>

            <Link
              href="?filter=Active"
              className={`font-medium p-1 px-2 rounded-lg cursor-pointer ${currentFilter === "Active" ? "text-[#2B4EFF] bg-white" : "text-[#718096]"}`}
            >
              Active {activeCount}
            </Link>
            
            <Link
              href="?filter=Inactive"
              className={`font-medium p-1 px-2 rounded-lg cursor-pointer ${currentFilter === "Inactive" ? "text-[#2B4EFF] bg-white" : "text-[#718096]"}`}
            >
              Inactive/Suspended {inactiveCount}
            </Link>
          </div>
        </div>

        <button className="px-4 py-2 rounded-lg bg-[#D9D9D9] text-[#718096] text-sm flex items-center gap-2 hover:bg-gray-300 transition-colors">
          <FileDown className="text-[#A0AEC0] w-4 h-4" />
          Download
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        {data ? (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead className="border-b">
                <tr className="text-left text-gray-500 font-medium">
                  <th className="p-4">ID</th>
                  <th>Business Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {displayVendors.length > 0 ? (
                  displayVendors.map((vendor) => {
                    const statusText = vendor.isActive ? "Active" : "Inactive";
                    return (
                      <tr
                        key={vendor._id}
                        className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
                      >
                        <td className="p-4 text-gray-400 text-xs font-mono">{vendor._id.slice(-6)}</td>
                        <td className="font-semibold text-gray-900">{vendor.businessProfile?.businessName || "Unnamed Vendor"}</td>
                        <td className="text-gray-500">N/A</td>
                        <td>
                          <span className={`px-3 flex items-center justify-center w-fit py-1.5 rounded-full text-xs font-medium ${statusStyles[statusText]}`}>
                            {statusText}
                          </span>
                        </td>
                        <td className="text-gray-600">{vendor.rate} ★</td>
                        <td className="text-[#2B4EFF] space-x-2">
                          <Button variant="link" className="p-0 h-auto">Edit</Button>
                          <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href={`/vendorprofile/${vendor._id}`}>View</Link>
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
