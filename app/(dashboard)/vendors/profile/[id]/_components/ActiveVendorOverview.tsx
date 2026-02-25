"use client";

import { VendorProfile, VendorService } from "@/lib/actions/vendors";
import { FileText, Image as ImageIcon, Star } from "lucide-react";

interface Props {
  vendor: VendorProfile;
  services: VendorService[];
  specialties: any[];
}

export default function ActiveVendorOverview({ vendor, services, specialties }: Props) {
  const profile = vendor.businessProfile as any;
  const user = vendor.userId as any;
  const vendorAny = vendor as any;

  const contactName = profile?.contactInfo?.primaryContactName || user?.firstName || "Unknown";
  const email = profile?.contactInfo?.emailAddress || user?.email || "—";
  const phone = profile?.contactInfo?.phoneNumber || "—";
  
  const joinedDate = new Date(vendorAny.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric"
  });

  const regType = profile?.businessRegType?.replace(/_/g, " ") || 'N/A';
  const yearsInBusiness = profile?.yearInBusiness?.replace(/_/g, " ") || 'N/A';

  const address = profile?.contactInfo?.addressId;
  const formatAddress = () => {
    if (!address) return "Address missing";
    return [address.street, address.city, address.state, address.postalCode, address.country]
      .filter(Boolean).join(", ");
  };

  const serviceArea = profile?.serviceArea;
  const serviceAreaNames: { city: string; state?: string; country?: string }[] = serviceArea?.areaNames || [];
  const serviceAreaString = serviceAreaNames.length > 0 
    ? serviceAreaNames.map(a => a.city).join(", ") 
    : "Not specified";

  let commissionDisplay = "10%";
  if (vendor.commissionAgreement?.accepted && vendor.commissionAgreement.commissionAmount) {
    const amt = vendor.commissionAgreement.commissionAmount;
    const type = vendor.commissionAgreement.commissionType;
    commissionDisplay = type === "percentage" ? `${amt}%` : `${amt} ${vendor.commissionAgreement.currency || "GBP"}`;
  }

  // Media arrays
  const documentsList: { name: string; url: string }[] = [];
  const portfolioList: { name: string; url: string }[] = [];

  const docs = profile?.businessDocuments || profile?.documents || [];
  if (Array.isArray(docs)) {
    docs.forEach((doc: any, i: number) => {
      const url = doc?.file?.url || doc?.url || (typeof doc === "string" ? doc : null);
      const name = doc?.docName || doc?.name || doc?.title || `Document_${i + 1}`;
      if (typeof url === "string" && url.trim()) {
        documentsList.push({ name, url });
      }
    });
  }

  const gallery = vendorAny?.portfolioGallery || vendorAny?.portfolioImages || [];
  if (Array.isArray(gallery)) {
    gallery.forEach((img: any, i: number) => {
      const url = img?.url || (typeof img === "string" ? img : null);
      const name = img?.originalName || `img_${String(i + 1).padStart(5, '0')}.jpg`;
      if (url) portfolioList.push({ name, url });
    });
  }
  if (vendor?.profilePhoto?.url) portfolioList.unshift({ name: "Business Logo", url: vendor.profilePhoto.url });
  if (vendor?.coverPhoto?.url) portfolioList.unshift({ name: "Profile Cover", url: vendor.coverPhoto.url });

  const CheckSquare = () => (
    <div className="w-[14px] h-[14px] rounded-sm bg-green-500 flex items-center justify-center shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col">
        {/* Quick Actions */}
        {/* <section className="py-8 border-b border-gray-100">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h3 className="font-semibold text-[15px] text-gray-900">Quick Actions</h3>
             <div className="flex items-center gap-3">
               <div className="w-8 h-[18px] bg-green-500 rounded-full relative cursor-pointer hover:bg-green-600 transition-colors">
                 <div className="w-3.5 h-3.5 bg-white rounded-full absolute right-[2px] top-[2px] shadow-sm"></div>
               </div>
               <span className="text-[11px] text-gray-600 font-medium">Temporarily Suspend Account</span>
             </div>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-[13px]">
            <li>Adjust Commission Rate (Current: <span className="font-medium text-gray-900">{commissionDisplay}</span>)</li>
            <li>Send Warning Notification</li>
          </ul>
        </section> */}

        {/* Performance metrics - only show if backend actually returns these later on. Right now, hiding static data */}
        {vendor.reviewCount !== undefined && (
          <section className="py-8 border-b border-gray-100">
            <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Performance Metrics</h3>
            <div className="flex gap-4">
              <div className="p-4 border rounded-xl border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-[150px]">
                <p className="text-[11px] font-semibold text-gray-500 mb-1 uppercase tracking-wider">Rating</p>
                <p className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
                  {vendor.rate > 0 ? vendor.rate.toFixed(1) : "N/A"} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-[10px] text-gray-400 mt-2">Reviews: {vendor.reviewCount}</p>
              </div>
            </div>
          </section>
        )}

        {/* Business Details */}
        <section className="py-8 border-b border-gray-100">
          <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Business Details</h3>
          <p>vendor Id: {vendor.id}</p>
          <div className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-y-4 items-start text-[13px]">
            <span className="text-gray-500 font-medium">Owner:</span>
            <span className="text-gray-900">{contactName} <span className="text-gray-400 mx-1">•</span> Joined: {joinedDate}</span>

            <span className="text-gray-500 font-medium">Business Type:</span>
            <span className="capitalize text-gray-900">{regType} <span className="text-gray-400 mx-1">•</span> {yearsInBusiness} experience</span>

            <span className="text-gray-500 font-medium">Service Area:</span>
            <span className="capitalize text-gray-900">{serviceAreaString} {serviceArea?.travelDistance ? `+ ${serviceArea.travelDistance} radius` : ""}</span>

            <span className="text-gray-500 font-medium pt-0.5">Registration:</span>
            <div className="space-y-2.5">
              {docs.length > 0 ? (
                docs.map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2.5 text-gray-900">
                    <CheckSquare />
                    <span>{d.docName || `Document ${i+1}`}</span>
                  </div>
                ))
              ) : (
                <span className="text-gray-400 italic">No registration documents uploaded</span>
              )}
            </div>

            <span className="text-gray-500 font-medium">Payment Model:</span>
            <span className="capitalize text-gray-900">{vendorAny.paymentModel?.replace(/_/g, " ") || "Split Payout (50% deposit)"}</span>

            <span className="text-gray-500 font-medium pt-0.5">Stripe Account:</span>
            <div className="flex items-center gap-2.5 text-gray-900">
               <CheckSquare />
               <span className="capitalize">{vendorAny.paymentAccountProvider || "Not Connected"}</span>
            </div>
          </div>
        </section>

        {/* Services & Contact */}
        <section className="py-8 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Services Categories</h3>
              <ul className="list-disc pl-5 space-y-3 text-[13px] text-gray-800">
                {services.length > 0 ? (
                   services.map((svc) => (
                     <li key={svc._id} className="capitalize">{svc.serviceCategory?.name || "Unknown"}</li>
                   ))
                ) : (
                  <span className="text-gray-400 italic block -ml-5">No services listed yet</span>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Contact Information</h3>
              <div className="space-y-3 text-[13px] text-gray-800">
                <div className="flex"><span className="w-24 text-gray-500 font-medium shrink-0">Email:</span> <span>{email}</span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-medium shrink-0">Phone:</span> <span>{phone}</span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-medium shrink-0">Mobile:</span> <span>{phone}</span></div>
                <div className="flex items-start"><span className="w-24 text-gray-500 font-medium shrink-0 mt-[1px]">Address:</span> <span className="leading-snug">{formatAddress()}</span></div>
                <div className="flex"><span className="w-24 text-gray-500 font-medium shrink-0">City:</span> <span className="capitalize">{address?.city || "London, UK"}</span></div>
                {vendorAny.socialMediaLinks?.map((s:any, i:number) => {
                   if (s.name === 'website') return <div key={i} className="flex"><span className="w-24 text-gray-500 font-medium shrink-0">Website:</span> <a href={s.link} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">{s.link.replace(/^https?:\/\//, '')}</a></div>;
                   return null;
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Documents & Portfolio */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Documents</h3>
              <div className="space-y-3 text-[13px] text-gray-800">
                {documentsList.length > 0 ? (
                   documentsList.map((doc, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <FileText className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
                       <a href={doc.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate capitalize font-medium">
                         {doc.name.replace(/_/g, " ")}.pdf
                       </a>
                     </div>
                   ))
                ) : (
                   <span className="text-gray-400 italic">No documents available</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[15px] text-gray-900 mb-5">Portfolio</h3>
              <div className="space-y-3 text-[13px] text-gray-800">
                {portfolioList.length > 0 ? (
                   portfolioList.map((port, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <ImageIcon className="w-4 h-4 text-blue-500 shrink-0" strokeWidth={2} />
                       <a href={port.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate font-medium">
                         {port.name}
                       </a>
                     </div>
                   ))
                ) : (
                   <span className="text-gray-400 italic">No portfolio media uploaded</span>
                )}
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
