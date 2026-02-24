"use client";

import { useState } from "react";
import Image from "next/image";
import { VendorProfile, VendorService } from "@/lib/actions/vendors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, MapPin, Mail, Phone, Calendar, ArrowUpRight, Star } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Props {
  vendor: VendorProfile;
  services: VendorService[];
  specialties: any[];
}

export default function ActiveVendorProfile({ vendor, services, specialties }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const profile = vendor.businessProfile;
  const businessName = profile?.businessName || "Unnamed Business";
  const contactName = profile?.contactInfo?.primaryContactName || vendor.userId?.firstName || "Unknown Vendor";
  const email = profile?.contactInfo?.emailAddress || vendor.userId?.email || "Unknown Email";
  const phone = profile?.contactInfo?.phoneNumber || "Unknown Phone";
  const regType = profile?.businessRegType ? profile.businessRegType.replace(/_/g, " ") : "Not Specified";
  const logoUrl = vendor.profilePhoto?.url || "https://placehold.co/400x400/png?text=No+Logo";
  const vendorId = vendor.id;
  
  const joinedDateRaw = (vendor as any).createdAt || new Date().toISOString();
  const joinedDate = new Date(joinedDateRaw).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  let commissionDisplay = "N/A";
  if (vendor.commissionAgreement?.accepted && vendor.commissionAgreement.commissionAmount) {
    const amt = vendor.commissionAgreement.commissionAmount;
    const type = vendor.commissionAgreement.commissionType;
    commissionDisplay = type === 'percentage' ? `${amt}%` : `${amt} ${vendor.commissionAgreement.currency || 'GBP'}`;
  }

  // Gather available media for the grid
  const coverPhotos: string[] = [];
  const galleryPhotos: string[] = [];
  const documentImages: string[] = [];
  const documentsList: { name: string; url: string }[] = [];

  const vendorData = vendor as any;
  const profileDataBlock = profile as any;
  
  if (vendor.coverPhoto?.url) coverPhotos.push(vendor.coverPhoto.url);
  if (vendor.profilePhoto?.url && vendor.profilePhoto.url !== vendor.coverPhoto?.url) coverPhotos.push(vendor.profilePhoto.url);

  // Portfolio Gallery — lives at vendor ROOT level
  const gallery = vendorData?.portfolioGallery || vendorData?.portfolioImages || [];
  if (Array.isArray(gallery)) {
    gallery.forEach((img: any) => {
      const url = img?.url || (typeof img === 'string' ? img : null);
      if (url && !galleryPhotos.includes(url)) galleryPhotos.push(url);
    });
  }
  
  // Business Documents — each doc is { docName, file: { url } }
  const docs = profileDataBlock?.businessDocuments || profileDataBlock?.documents || [];
  if (Array.isArray(docs)) {
    docs.forEach((doc: any, i: number) => {
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

  const totalImagesCount = coverPhotos.length + galleryPhotos.length + documentImages.length;

  return (
    <div className="space-y-6">
      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-1 border-none bg-black overflow-hidden flex items-center justify-center">
          <DialogTitle className="sr-only">Image Viewer</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center min-h-[50vh] min-w-[50vw]">
              <img 
                src={selectedImage} 
                alt="Enlarged Portfolio View" 
                className="max-w-full max-h-[85vh] object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* HERO SECTION */}
      <Card className="rounded-xl border shadow-sm overflow-hidden">
        {/* Cover Photo Mock */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700 w-full relative">
          {vendor.coverPhoto && (
            <Image src={vendor.coverPhoto.url} alt="Cover" fill className="object-cover opacity-60 mix-blend-overlay" />
          )}
        </div>
        
        <CardContent className="p-6 pt-0 relative">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo overlaps cover photo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 border-4 border-white rounded-xl overflow-hidden relative bg-white -mt-12 shadow-sm">
              <Image src={logoUrl} alt={`${businessName} Logo`} fill className="object-contain p-2" unoptimized />
            </div>
            
            <div className="flex-1 mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{businessName}</h2>
                <p>{vendorId}</p>
                <div className="flex items-center gap-2 mt-1 mb-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 uppercase tracking-wider text-[10px]">
                    Active Vendor
                  </Badge>
                  <span className="flex items-center text-yellow-500 text-sm font-medium ml-2">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {vendor.rate > 0 ? vendor.rate.toFixed(1) : "New"}
                    <span className="text-gray-400 ml-1 font-normal">({vendor.reviewCount} reviews)</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 max-w-lg mt-3">
                  <span className="capitalize">{regType}</span> active on the platform since {joinedDate}. 
                  Provides {services.length} services across {specialties.length} specialty categories.
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4" /> View Storefront
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-col-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          {/* Contact Details */}
          <Card className="rounded-xl border shadow-sm h-full">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-[15px] text-gray-700">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="font-semibold text-sm">{contactName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contactName}</p>
                  <p className="text-xs text-gray-500">Primary Contact</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 pt-2 border-t">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{email}</span>
                <Copy className="w-3 h-3 text-gray-300 ml-auto cursor-pointer hover:text-gray-500" />
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{phone}</span>
                <Copy className="w-3 h-3 text-gray-300 ml-auto cursor-pointer hover:text-gray-500" />
              </div>
              
              <div className="flex gap-3 text-sm text-gray-600">
                <MapPin className="top-1 relative w-4 h-4 text-gray-400 shrink-0" />
                <span className="leading-snug">
                  {profile?.contactInfo?.primaryContactName ? "London, UK (Vendor address pending API)" : "Address missing"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6 w-full">
          
          {/* Services & Specialties */}
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-[15px] text-gray-700">Services & Categories</CardTitle>
              <Badge variant="secondary" className="font-mono text-[10px]">{services.length} Listed</Badge>
            </CardHeader>
            <CardContent className="p-0 text-sm">
              {services.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  This vendor hasn't set up any services yet.
                </div>
              ) : (
                <div className="divide-y">
                  {services.map((svc) => {
                    // Specialties have a serviceSpecialty.serviceCategoryId which matches svc.serviceCategory._id
                    const svcSpec = specialties.filter((s:any) => s.serviceSpecialty?.serviceCategoryId === svc.serviceCategory?._id);
                    return (
                      <div key={svc._id} className="p-5 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 capitalize">
                            {svc.serviceCategory?.name || "Unknown Category"}
                          </h4>
                          <span className="text-xs text-gray-500 font-mono">ID: {svc._id?.slice(-6)}</span>
                        </div>
                        <p className="text-gray-600 text-[13px] mb-3">
                          Min booking: {svc.minimumBookingDuration?.replace(/_/g, " ") || 'N/A'} • 
                          Lead Time: {svc.leadTimeRequired?.replace(/_/g, " ") || 'N/A'}
                        </p>
                        
                        <div className="flex flex-col gap-2">
                          {svcSpec.length === 0 ? (
                            <span className="text-xs text-gray-400 italic">No specialties</span>
                          ) : (
                            svcSpec.map((s, idx) => (
                              <div key={idx} className="flex justify-between items-center text-sm px-3 py-2 bg-gray-50 rounded border">
                                <div>
                                  <div className="font-medium text-gray-800 capitalize">
                                    {s.serviceSpecialty?.name || "Unnamed"}
                                  </div>
                                  {s.serviceSpecialty?.description && (
                                    <div className="text-xs text-gray-500 mt-0.5 max-w-sm truncate">
                                      {s.serviceSpecialty.description}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline" className="font-mono text-[11px] uppercase tracking-wide bg-white">
                                    {s.priceCharge?.replace(/_/g, " ")}: £{s.price}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-[15px] text-gray-700">Agreements & Verification</CardTitle>
            </CardHeader>
            <CardContent className="p-5 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Platform Commission</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{commissionDisplay}</span>
                    {vendor.commissionAgreement?.accepted && <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Accepted</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Company Reg Number</h5>
                  <span className="text-lg font-mono text-gray-800">{profile?.companyRegNo || "—"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PORTFOLIO & DOCUMENTS */}
          {(totalImagesCount > 0 || documentsList.length > 0) && (
            <Card className="rounded-xl border shadow-sm mt-6">
              <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                <CardTitle className="text-[15px] text-gray-700">Portfolio & Documents</CardTitle>
                <Badge variant="secondary" className="font-mono text-[10px]">{totalImagesCount} Media</Badge>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* BUSINESS DOCUMENTS (FILES & IMAGES) */}
                {(documentsList.length > 0 || documentImages.length > 0) && (
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3 border-b pb-2">Business Documents</h3>
                    
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
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3 border-b pb-2">Portfolio Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {galleryPhotos.map((url, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedImage(url)}
                          className="aspect-square relative rounded border overflow-hidden bg-gray-50 cursor-pointer group hover:opacity-90 hover:ring-2 hover:ring-[#2B4EFF] transition-all"
                        >
                          <Image src={url} alt={`Portfolio ${i}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                          <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            View
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PLATFORM PHOTOS */}
                {coverPhotos.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3 border-b pb-2">Cover & Profile Photos</h3>
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

              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
