import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  getAdminVendorById,
  getAdminVendorServices,
  getAdminVendorSpecialties,
} from "@/lib/actions/vendors";
import InactiveVendorReview from "./_components/InactiveVendorReview";
import ActiveVendorProfile from "./_components/ActiveVendorProfile";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VendorProfilePage({ params }: PageProps) {
  // Await params as required in Next 15+
  const resolvedParams = await params;
  const vendorId = resolvedParams.id;

  if (!vendorId) {
    return notFound();
  }

  // Fetch the data concurrently
  const [vendorRes, servicesRes, specialtiesRes] = await Promise.all([
    getAdminVendorById(vendorId),
    getAdminVendorServices(vendorId),
    getAdminVendorSpecialties(vendorId),
  ]);

  if (!vendorRes.success || !vendorRes.data) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-4">
        <h2 className="text-xl font-bold text-red-600">Vendor Not Found</h2>
        <p className="text-gray-500">{vendorRes.error || "The requested vendor could not be located."}</p>
        <Link
          href="/vendors"
          className="mt-4 px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition"
        >
          Return to Vendors
        </Link>
      </div>
    );
  }

  const vendor = vendorRes.data;

  const services = servicesRes.success ? (servicesRes.data || []) : [];
  const specialties = specialtiesRes.success ? (specialtiesRes.data || []) : [];
  
  // Decide which View to render based on isActive and onBoarded status
  // If the user hasn't successfully completed all steps, or is pending review, show the review UI
  const isPendingReview = !vendor.isActive; // Assuming inactive vendors require review/activation

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
        <Link 
          href="/vendors" 
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          BACK
        </Link>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide uppercase">
            {isPendingReview ? "Vendor Application Review" : "Vendor Profile Management"}
          </h1>
          <p className="text-sm text-gray-500 font-mono mt-1">
            #{vendor._id.slice(-6).toUpperCase()}
          </p>
        </div>
        
        {/* Invisible spacer to perfectly center the title against the back button */}
        <div className="w-[84px] hidden sm:block"></div> 
      </div>

      {isPendingReview ? (
        <InactiveVendorReview 
          vendor={vendor} 
          services={services} 
          specialties={specialties} 
        />
      ) : (
        <ActiveVendorProfile 
          vendor={vendor} 
          services={services} 
          specialties={specialties} 
        />
      )}
    </div>
  );
}
