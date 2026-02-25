"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ClientProfile, updateClientStatus } from "@/lib/actions/clients";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Loader2, LayoutDashboard, CalendarDays, Wallet, Star } from "lucide-react";
import ClientPaymentDashboardView from "./ClientPaymentDashboardView";
import ClientPerformanceMetrics from "./ClientPerformanceMetrics";
import ClientBookings from "./ClientBookings";
import ClientReviews from "./ClientReviews";

interface Props {
  client: ClientProfile;
}

export default function ClientProfileView({ client }: Props) {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<"suspend" | "block" | null>(null);
  
  const avatarUrl = client.avatar?.url || "https://placehold.co/400x400/png?text=No+Photo";
  
  const joinedDate = new Date(client.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const lastActive = client.lastActiveAt 
    ? new Date(client.lastActiveAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" }) 
    : "Never";

  const isBanned = client.status === "banned";
  const isActive = client.status === "active";

  const address = client.addressId;
  const locationStr = address ? [address.city, address.country].filter(Boolean).join(", ") : "Not provided";

  // Mock performance metrics for demo matching the image
  const metrics = [
    { label: "Total Bookings", value: "3" },
    { label: "Total Spend", value: "£4,830" },
    { label: "Avg. Booking Value", value: "£1,610", sub: "Reviews: 247" },
    { label: "Repeat Rate", value: "67%", sub: "0.4% of bookings" },
    { label: "Disputes", value: "1" },
  ];

  const handleToggleSuspend = async () => {
    if (loadingAction) return;
    setLoadingAction("suspend");
    
    const action = isBanned ? "reactivate" : "suspend";
    const reason = isBanned ? undefined : "Temporarily suspended via dashboard quick action";
    
    try {
      const res = await updateClientStatus(client._id, action, reason);
      if (!res.success) {
        toast.error(res.error || `Failed to ${action} account`);
      } else {
        toast.success(`Account successfully ${isBanned ? "reactivated" : "suspended"}`);
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleToggleBlock = async () => {
    // This function can be kept empty or completely removed since the block action is not supported by the backend
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center justify-center py-8 relative bg-gray-50/50 border-b border-gray-100">
        <button 
          onClick={() => router.back()} 
          className="absolute left-6 top-8 flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase">Client Profile Management</h1>
        <p className="text-sm font-medium text-gray-400 font-mono mt-2 tracking-wider">{client.id}</p>
      </div>

      <div className="p-6 sm:p-10">
        <Tabs defaultValue="overview" className="w-full">
          {/* TABS LIST */}
          <div className="border-b border-gray-100 mb-8">
            <TabsList className="bg-transparent h-auto p-0 flex justify-start gap-4 sm:gap-8 w-full border-0 rounded-none overflow-x-auto">
              <TabsTrigger 
                value="overview" 
                className="relative -mb-px pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="relative -mb-px pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger 
                value="spending" 
                className="relative -mb-px pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Spending</span>
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="relative -mb-px pb-3 pt-2 px-1 rounded-none bg-transparent shadow-none border-b-2 border-transparent data-[state=active]:border-b-red-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[15px] font-medium text-gray-500 data-[state=active]:text-gray-900 data-[state=active]:font-semibold hover:text-gray-900 transition-colors focus-visible:ring-0 after:hidden flex items-center gap-2"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Reviews</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col gap-10">
              
              {/* Quick Actions */}
              <section className="border-b border-gray-100 pb-10 max-w-2xl">
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Quick Actions:</h3>
                <div className="space-y-4">
                  <div className={`flex items-center gap-4 ${loadingAction === 'suspend' ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div 
                      onClick={handleToggleSuspend}
                      className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${isBanned ? 'bg-red-500' : 'bg-gray-200'}`}
                    >
                       <div className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-all ${isBanned ? 'left-[22px]' : 'left-[2px]'} shadow-sm flex items-center justify-center`}>
                          {loadingAction === 'suspend' && (
                            <Loader2 className="w-3 h-3 text-gray-400 animate-spin" />
                          )}
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] text-gray-700 font-medium">
                        {isBanned ? "Re-activate Account" : "Suspend Account"}
                      </span>
                      {isBanned ? (
                        <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-red-100">Banned</span>
                      ) : (
                        <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-green-100">Active</span>
                      )}
                      {loadingAction === 'suspend' && (
                        <span className="text-[12px] text-gray-500 italic ml-2">Processing...</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Performance Metrics */}
              <section className="border-b border-gray-100 pb-10">
                <h3 className="font-semibold text-lg text-gray-900 mb-6">Performance metrics</h3>
                <ClientPerformanceMetrics clientId={client.id} />
              </section>

              {/* Basic Information */}
              <section className="max-w-md">
                <div className="p-6 border rounded-xl border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <h3 className="font-semibold text-[15px] text-gray-900 mb-6">Basic Information</h3>
                  
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-8 border border-gray-200">
                    <Image src={avatarUrl} alt={`${client.firstName} Avatar`} width={80} height={80} className="object-cover w-full h-full" unoptimized />
                  </div>

                  <div className="space-y-4 md:space-y-4 text-[13px]">
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Full Name:</span>
                      <span className="text-gray-900 truncate" title={`${client.firstName} ${client.lastName}`}>{client.firstName} {client.lastName}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Client ID:</span>
                      <span className="text-gray-900 truncate" title={client.id}>{client.id}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Email:</span>
                      <span className="text-gray-900 truncate" title={client.email}>{client.email}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Phone:</span>
                      <span className="text-gray-900">{client.phoneNumber || "Not provided"}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Location:</span>
                      <span className="text-gray-900">{locationStr}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Signup Date:</span>
                      <span className="text-gray-900">{joinedDate}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2">
                      <span className="text-gray-500 font-medium">Last Login:</span>
                      <span className="text-gray-900">{lastActive}</span>
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[120px_1fr] md:items-start gap-1 md:gap-x-2 mt-4 md:mt-2 pt-4 md:pt-2 border-t border-gray-50">
                      <span className="text-gray-500 font-medium pt-0.5">Account Status:</span>
                      <span className="text-gray-900 flex items-center gap-2 capitalize">
                        <span className={`w-3 h-3 rounded-full flex shrink-0 \${isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {client.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-0 pt-4">
             <ClientBookings clientId={client.id} />
          </TabsContent>
          
          <TabsContent value="spending" className="mt-0 pt-4">
             <ClientPaymentDashboardView clientId={client.id} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0 pt-4">
             <ClientReviews clientId={client.id} />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
