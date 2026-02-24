"use client";

import Image from "next/image";
import { ClientProfile } from "@/lib/actions/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  client: ClientProfile;
}

export default function ClientProfileView({ client }: Props) {
  const isVerified = client.emailVerified;
  const avatarUrl = client.avatar?.url || "https://placehold.co/400x400/png?text=No+Photo";
  
  const joinedDate = new Date(client.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const lastActive = client.lastActiveAt 
    ? new Date(client.lastActiveAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) 
    : "Never";

  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
    banned: "bg-red-50 text-red-700 border-red-200",
    pending_verification: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const badgeStyle = statusStyles[client.status] || "bg-gray-100 text-gray-700";

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <Card className="rounded-xl border shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700 w-full relative"></div>
        
        <CardContent className="p-6 pt-0 relative flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 border-4 border-white rounded-full overflow-hidden relative bg-gray-50 -mt-12 shadow-sm">
            <Image src={avatarUrl} alt={`${client.firstName} Avatar`} fill className="object-cover" unoptimized />
          </div>
          
          <div className="flex-1 mt-4 md:mt-2">
            <div className="flex flex-col md:flex-row justify-between md:items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {client.firstName} {client.lastName}
                  {isVerified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </h2>
                <div className="text-sm text-gray-500 font-mono mt-1 mb-3">ID: {client.id}</div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={`uppercase tracking-wider text-[10px] ${badgeStyle}`}>
                    {client.status.replace(/_/g, " ")}
                  </Badge>
                  <Badge variant="secondary" className="uppercase tracking-wider text-[10px]">
                    {client.role}
                  </Badge>
                  <Badge variant="outline" className="text-gray-500 uppercase tracking-wider text-[10px]">
                    Auth: {client.authProvider}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-right space-y-1">
                <div className="text-sm text-gray-500 flex items-center justify-end gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400" /> 
                  Joined {joinedDate}
                </div>
                <div className="text-sm text-gray-500 flex items-center justify-end gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Last Active: {lastActive}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-col-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-[15px] text-gray-700">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{client.email}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{client.phoneNumber || "Not provided"}</span>
              </div>
              
              <div className="flex gap-3 text-sm text-gray-600">
                <MapPin className="top-1 relative w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="leading-snug">
                  {client.addressId ? (
                    <>
                      {client.addressId.street}, <br/>
                      {client.addressId.city}, {client.addressId.state} <br/>
                      {client.addressId.country} {client.addressId.postalCode}
                    </>
                  ) : "Address missing"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6 w-full">
          
          <Card className="rounded-xl border shadow-sm">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-[15px] text-gray-700">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Gender</h5>
                  <p className="text-sm font-medium text-gray-900 capitalize">{client.gender || "Not specified"}</p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Date of Birth</h5>
                  <p className="text-sm font-medium text-gray-900">
                    {client.dateOfBirth 
                      ? new Date(client.dateOfBirth).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Has Password Setup</h5>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    {client.hasPassword ? (
                      <><CheckCircle2 className="w-4 h-4 text-green-500" /> Yes</>
                    ) : (
                      <><XCircle className="w-4 h-4 text-red-500" /> No</>
                    )}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Favorites Count</h5>
                  <p className="text-sm font-medium text-gray-900">
                    {client.customerFavoriteVendors?.length || 0} Vendors saved
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
