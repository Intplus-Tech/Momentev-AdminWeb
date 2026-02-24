"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VendorProfile, VendorService, approveVendor } from "@/lib/actions/vendors";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  vendor: VendorProfile;
  services: VendorService[];
  specialties: any[];
}

export default function InactiveVendorReview({ vendor, services, specialties }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUpdating, startTransition] = useTransition();
  const router = useRouter();

  const profile = vendor.businessProfile;
  const businessName = profile?.businessName || "Unnamed Business";
  const contactName = profile?.contactInfo?.primaryContactName || vendor.userId?.firstName || "Unknown Applicant";
  
  // Format Application Date (using created date or fallback to now if missing)
  const appliedDateRaw = (vendor as any).createdAt || new Date().toISOString();
  const appliedDate = new Date(appliedDateRaw).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const appliedTime = new Date(appliedDateRaw).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  });

  const regType = profile?.businessRegType ? profile.businessRegType.replace(/_/g, " ") : "Not Specified";
  const vendorId = vendor.id;
  
  // Determine categories/subcategories based on services and specialties
  const categoriesList = services.map(s => s.serviceCategory?.name).filter(Boolean).join(", ");
  const specialtiesList = specialties.map((s:any) => s.serviceSpecialty?.name).filter(Boolean).join(", ");
  const logoUrl = vendor.profilePhoto?.url || "https://placehold.co/400x400/png?text=No+Logo";
  
  // Gather available media for the grid
  const coverPhotos: string[] = [];
  const galleryPhotos: string[] = [];
  const documentImages: string[] = [];
  const documentsList: { name: string; url: string }[] = [];

  if (vendor.coverPhoto?.url) coverPhotos.push(vendor.coverPhoto.url);
  if (vendor.profilePhoto?.url && vendor.profilePhoto.url !== vendor.coverPhoto?.url) coverPhotos.push(vendor.profilePhoto.url);
  
  const vendorData = vendor as any;
  const profileDataBlock = profile as any;
  
  // Portfolio Gallery — lives at vendor ROOT level (not inside businessProfile)
  const gallery = vendorData?.portfolioGallery || vendorData?.portfolioImages || [];
  if (Array.isArray(gallery)) {
    gallery.forEach((img: any) => {
      const url = img?.url || (typeof img === 'string' ? img : null);
      if (url && !galleryPhotos.includes(url)) galleryPhotos.push(url);
    });
  }
  
  // Business Documents — lives at businessProfile level, each doc is { docName, file: { url } }
  const docs = profileDataBlock?.businessDocuments || profileDataBlock?.documents || [];
  if (Array.isArray(docs)) {
    docs.forEach((doc: any, i: number) => {
       // The real URL is inside doc.file.url (nested file object)
       const url = doc?.file?.url || doc?.url || (typeof doc === 'string' ? doc : null);
       const name = doc?.docName || doc?.name || doc?.title || doc?.documentType || `Document_${i + 1}`;
       
       if (typeof url === 'string' && url.trim()) {
         if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i) && !documentImages.includes(url)) {
            documentImages.push(url);
         } else {
            documentsList.push({ name, url });
         }
       }
    });
  }

  // Merge for global portfolio counts if needed
  const totalImagesCount = coverPhotos.length + galleryPhotos.length + documentImages.length;

  // Handler stubs
  const handleApprove = () => {
    startTransition(async () => {
      try {
        const result = await approveVendor(vendor.id);
        
        if (result.success) {
          toast.success("Vendor approved and activated successfully!");
          router.refresh();
        } else {
          toast.error(result.error || "Failed to approve vendor.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
    });
  };

  const handleRequestInfo = () => {
    alert("Request More Info clicked.");
  };

  const handleReject = () => {
    alert("Reject clicked.");
  };

  return (
    <div className="space-y-6">
      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-1 border-none bg-black overflow-hidden flex items-center justify-center">
          <DialogTitle className="sr-only">Image Viewer</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center min-h-[50vh] min-w-[50vw]">
              {/* Using native img for the lightbox to maximize intrinsic scaling inside full screen, next/image fill behaves differently without explicit parent sizes */}
              <img 
                src={selectedImage} 
                alt="Enlarged Portfolio View" 
                className="max-w-full max-h-[85vh] object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* APPLICANT HEADER CARD */}
      <Card className="rounded-xl border shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 border rounded-lg overflow-hidden relative bg-gray-50 flex items-center justify-center">
              <Image 
                src={logoUrl} 
                alt={`${businessName} Logo`}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-3">
              <div className="text-[15px]">
                <span className="font-semibold text-gray-700">Applicant:</span> {contactName} • {businessName}
              </div>
              <p>{vendorId}</p>
              <div className="text-[15px]">
                <span className="font-semibold text-gray-700">Applied:</span> {appliedDate} • {appliedTime}
              </div>
              <div className="text-[15px]">
                <span className="font-semibold text-gray-700">Category:</span> {categoriesList || "N/A"} • <span className="font-semibold text-gray-700">Subcategory:</span> {specialtiesList || "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* APPLICATION DETAILS & DOCUMENTS */}
      <Card className="rounded-xl border shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Application Details</h2>
          
          <ul className="space-y-2 mb-8 text-[15px]">
            <li className="flex gap-2">
              <span className="font-semibold w-36 text-gray-700">Business:</span> 
              <span><span className="capitalize">{regType}</span></span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold w-36 text-gray-700">Registration Type:</span> 
              <span>{profile?.businessRegType?.replace(/_/g, " ") || 'N/A'}</span>
            </li>
            <li className="flex gap-2">
              <span className="font-semibold w-36 text-gray-700">Portfolio:</span> 
              <span>{totalImagesCount} images uploaded</span>
            </li>
          </ul>

          <div className="border-t pt-6 space-y-8">
            
            {/* BUSINESS DOCUMENTS (FILES & IMAGES) */}
            {(documentsList.length > 0 || documentImages.length > 0) && (
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 mb-3 border-b pb-2">Business Documents</h3>
                
                {documentsList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {documentsList.map((doc, idx) => (
                      <a 
                        key={idx} 
                        href={doc.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-4 py-2 hover:text-[#2B4EFF] bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer rounded-md border border-gray-200 hover:border-blue-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        <span className="capitalize text-sm font-medium text-gray-700">{doc.name.replace(/_/g, ' ')}</span>
                      </a>
                    ))}
                  </div>
                )}

                {documentImages.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-3">
                    {documentImages.map((url, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedImage(url)}
                        className="aspect-[4/3] relative rounded border bg-gray-100 cursor-pointer group overflow-hidden"
                      >
                        <Image src={url} alt={`Doc Img ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                        <div className="absolute inset-x-0 bottom-0 py-1 bg-black/60 text-white text-[10px] text-center">View Image</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PORTFOLIO GALLERY */}
            {galleryPhotos.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 mb-3 border-b pb-2">Portfolio Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {galleryPhotos.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedImage(url)}
                      className="aspect-square relative rounded border overflow-hidden bg-gray-100 cursor-pointer group"
                    >
                      <Image src={url} alt={`Portfolio ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PLATFORM PHOTOS */}
            {coverPhotos.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 mb-3 border-b pb-2">Cover & Profile Photos</h3>
                <div className="flex gap-4">
                  {coverPhotos.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedImage(url)}
                      className="w-24 h-24 lg:w-32 lg:h-32 relative rounded border overflow-hidden bg-gray-100 cursor-pointer group"
                    >
                      <Image src={url} alt={`Cover/Profile ${i}`} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </CardContent>
      </Card>

      {/* ACTION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-12">
        <Button 
          onClick={handleApprove} 
          disabled={isUpdating}
          className="w-full sm:w-auto bg-[#2B4EFF] hover:bg-blue-700 text-white px-8 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {isUpdating ? "Approving..." : "Approve & Activate"}
        </Button>
        <Button 
          onClick={handleRequestInfo}
          variant="outline" 
          disabled
          className="w-full sm:w-auto text-[#2B4EFF] border-[#2B4EFF] hover:bg-blue-50 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Request More Info
        </Button>
        <Button 
          onClick={handleReject}
          variant="outline" 
          className="w-full sm:w-auto text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 px-8"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
