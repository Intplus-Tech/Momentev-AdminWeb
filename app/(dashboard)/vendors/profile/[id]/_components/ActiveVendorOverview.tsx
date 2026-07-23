"use client";

import { VendorProfile, VendorService } from "@/lib/actions/vendors";
import { FileText, Image as ImageIcon } from "lucide-react";
import VendorStatusActions from "./VendorStatusActions";
import EditBusinessProfileModal from "./EditBusinessProfileModal";
import EditContactInfoModal from "./EditContactInfoModal";

interface Props {
  vendor: VendorProfile;
  services: VendorService[];
  specialties: any[];
}

export default function ActiveVendorOverview({ vendor, services, specialties }: Props) {
  const profile = vendor.businessProfile as any;
  const user = vendor.userId as any;
  const vendorAny = vendor as any;
  const status =
    user?.status === "active" || user?.status === "suspended" || user?.status === "banned"
      ? user.status
      : vendor.vendorStatus || (vendor.isActive ? "active" : "suspended");

  const quickActionCopy =
    status === "banned"
      ? "This vendor is banned and cannot access the dashboard or public listings. Reactivate to restore access."
      : status === "suspended"
        ? "This vendor is suspended and cannot access the dashboard. Reactivate to restore access, or use Ban for a permanent restriction."
        : "Suspend to restrict access while keeping data, or Ban to completely remove the vendor from the platform. Provide a reason for audit trail.";

  const userName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Unknown";
  const userEmail = user?.email || "—";
  const userPhone = user?.phoneNumber || "—";
  const contactName = profile?.contactInfo?.primaryContactName || "—";
  const contactEmail = profile?.contactInfo?.emailAddress || "—";
  const contactPhone = profile?.contactInfo?.phoneNumber || "—";
  const meansOfIdentification = profile?.contactInfo?.meansOfIdentification || "—";
  const businessName = profile?.businessName || "—";
  const userInitials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((value: string) => value.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2) || "VP";

  const regType = profile?.businessRegType?.replace(/_/g, " ") || 'N/A';
  const yearsInBusiness = profile?.yearInBusiness?.replace(/_/g, " ") || 'N/A';
  const dateOfBirth = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "—";

  const address = profile?.contactInfo?.addressId;
  const formatAddress = () => {
    if (!address) return "Address missing";
    if (typeof address === "string") return "Address details unavailable";
    return [address.street, address.city, address.state, address.postalCode, address.country]
      .filter(Boolean).join(", ") || "Address details unavailable";
  };

  const serviceArea = profile?.serviceArea;
  const serviceAreaNames: { city: string; state?: string; country?: string }[] = serviceArea?.areaNames || [];
  const serviceAreaString = serviceAreaNames.length > 0
    ? serviceAreaNames.map(a => a.city).join(", ")
    : "Not specified";

  const statusBadgeClass =
    status === "banned"
      ? "bg-red-50 text-red-700 border-red-200"
      : status === "suspended"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200";

  const onboardingLabel = vendor.onBoarded ? "Onboarding complete" : `Onboarding stage ${vendor.onBoardingStage || 0}`;

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
    <div className="w-3.5 h-3.5 rounded-sm bg-green-500 flex items-center justify-center shrink-0">
      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );

  const InfoRow = ({ label, value, multiline = false }: { label: string; value: React.ReactNode; multiline?: boolean }) => (
    <div className={`grid gap-1 ${multiline ? "sm:grid-cols-[140px_1fr]" : "sm:grid-cols-[140px_1fr] sm:items-start"}`}>
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">{label}</span>
      <div className="text-sm leading-6 text-gray-900">{value}</div>
    </div>
  );

  const SectionCard = ({
    title,
    subtitle,
    action,
    children,
  }: {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-gray-950">{title}</h3>
            {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_52%,#fff4f1_100%)] p-5 shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:p-6">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-red-100/60 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-slate-200/70 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-lg font-semibold text-white shadow-lg shadow-gray-950/10">
              {userInitials}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">Vendor Account</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">{userName}</h2>
                <p className="mt-1 text-sm text-gray-600">{businessName !== "—" ? businessName : "Business details pending"}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 font-medium capitalize ${statusBadgeClass}`}>
                  {status}
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 font-medium text-slate-700">
                  {onboardingLabel}
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 font-medium text-gray-700">
                  {services.length} service{services.length === 1 ? "" : "s"}
                </span>
                <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-3 py-1 font-medium text-gray-700">
                  {specialties.length} specialt{specialties.length === 1 ? "y" : "ies"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl rounded-3xl border border-white/70 bg-white/80 p-4 backdrop-blur lg:p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Quick Actions</p>
                <p className="mt-1 text-sm leading-6 text-gray-600">{quickActionCopy}</p>
              </div>
              <div className="shrink-0">
                <VendorStatusActions vendor={vendor} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="User Information" subtitle="Account-level details from the linked user record.">
          <InfoRow label="Name" value={userName} />
          <InfoRow label="Email" value={userEmail} />
          <InfoRow label="Phone" value={userPhone} />
          <InfoRow label="Gender" value={<span className="capitalize">{user?.gender || "—"}</span>} />
          <InfoRow label="Date of birth" value={dateOfBirth} />
        </SectionCard>

        <SectionCard title="Business Operations" subtitle="Operational state and payout readiness.">
          <InfoRow label="Onboarding" value={vendor.onBoarded ? "Complete" : `In progress (stage ${vendor.onBoardingStage || 0})`} />
          <InfoRow label="Payment model" value={<span className="capitalize">{vendorAny.paymentModel?.replace(/_/g, " ") || "Not configured"}</span>} />
          <InfoRow label="Payment account" value={<span className="capitalize">{vendorAny.paymentAccountProvider?.replace(/_/g, " ") || "Not connected"}</span>} />
          <InfoRow label="Commission" value={vendor.commissionAgreement?.accepted ? "Accepted" : "Not accepted"} />
          <InfoRow label="Vendor ID" value={vendor.id} />
        </SectionCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Business Information"
          subtitle="Business profile data and the single business address."
          action={<EditBusinessProfileModal vendor={vendor} />}
        >
          <InfoRow label="Business profile ID" value={profile?._id || "—"} />
          <InfoRow label="Business name" value={businessName} />
          <InfoRow label="Years in business" value={<span className="capitalize">{yearsInBusiness}</span>} />
          <InfoRow label="Business type" value={<span className="capitalize">{regType}</span>} />
          <InfoRow label="Registration no." value={profile?.companyRegNo || "—"} />
          <InfoRow label="Description" value={profile?.businessDescription || "—"} multiline />
          <InfoRow label="Business address" value={formatAddress()} multiline />
          <InfoRow
            label="Service area"
            value={<span className="capitalize">{serviceAreaString} {serviceArea?.travelDistance ? `+ ${serviceArea.travelDistance} radius` : ""}</span>}
            multiline
          />
        </SectionCard>

        <SectionCard
          title="Contact Information"
          subtitle="Business-facing contact channels and identity details."
          action={<EditContactInfoModal vendor={vendor} />}
        >
          <InfoRow label="Primary contact" value={contactName} />
          <InfoRow label="Business email" value={contactEmail} />
          <InfoRow label="Business phone" value={contactPhone} />
          <InfoRow label="Identification" value={meansOfIdentification} />
          {vendorAny.socialMediaLinks?.some((socialLink: any) => socialLink.name === "website") ? (
            vendorAny.socialMediaLinks.map((socialLink: any, index: number) => {
              if (socialLink.name !== "website") return null;
              return (
                <InfoRow
                  key={index}
                  label="Website"
                  value={
                    <a href={socialLink.link} className="break-all text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      {socialLink.link.replace(/^https?:\/\//, "")}
                    </a>
                  }
                  multiline
                />
              );
            })
          ) : (
            <InfoRow label="Website" value="—" />
          )}
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Service Categories" subtitle="Top-level service groupings this vendor offers.">
          {services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {services.map((svc) => (
                <span
                  key={svc._id}
                  className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium capitalize text-violet-800"
                >
                  {svc.serviceCategory?.name || "Unknown"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">No services listed yet</p>
          )}
        </SectionCard>

        <SectionCard title="Specialties" subtitle="Specific specialties attached to the vendor profile.">
          {specialties.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty: any) => (
                <span
                  key={specialty._id || specialty.id}
                  className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium capitalize text-sky-800"
                >
                  {specialty.specialty?.name || specialty.name || "Unknown"}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">No specialties listed yet</p>
          )}
        </SectionCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="Documents" subtitle="Business registration and compliance uploads.">
          {documentsList.length > 0 ? (
            <div className="space-y-3">
              {documentsList.map((doc, i) => (
                <a
                  key={i}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition-colors hover:border-rose-200 hover:bg-rose-50/60"
                >
                  <FileText className="h-4 w-4 shrink-0 text-rose-500" strokeWidth={2} />
                  <span className="min-w-0 truncate text-sm font-medium capitalize text-gray-900">{doc.name.replace(/_/g, " ")}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">No documents available</p>
          )}
        </SectionCard>

        <SectionCard title="Portfolio" subtitle="Media attached to the vendor profile and gallery.">
          {portfolioList.length > 0 ? (
            <div className="space-y-3">
              {portfolioList.map((port, i) => (
                <a
                  key={i}
                  href={port.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 transition-colors hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <ImageIcon className="h-4 w-4 shrink-0 text-blue-500" strokeWidth={2} />
                  <span className="min-w-0 truncate text-sm font-medium text-gray-900">{port.name}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm italic text-gray-400">No portfolio media uploaded</p>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Registration Checklist" subtitle="At-a-glance confirmation of uploaded business documents.">
        {docs.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {docs.map((d: any, i: number) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm text-emerald-900">
                <CheckSquare />
                <span className="truncate">{d.docName || `Document ${i + 1}`}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">No registration documents uploaded</p>
        )}
      </SectionCard>
    </div>
  );
}
