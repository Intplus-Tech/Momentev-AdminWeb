"use client";

import { useRouter } from "next/navigation";
import { ClientProfile } from "@/lib/actions/clients";
import { Button } from "@/components/ui/button";

interface Props {
  clients: ClientProfile[];
}

export default function CustomersTable({ clients }: Props) {
  const router = useRouter();

  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700 border border-green-200",
    inactive: "bg-gray-100 text-gray-700 border border-gray-200",
    banned: "bg-red-50 text-red-700 border border-red-200",
    pending_verification: "bg-amber-50 text-amber-700 border border-amber-200",
  };

  /* ================= HANDLER ================= */

  const handleView = (id: string) => {
    router.push(`/clients/profile/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="border-b bg-gray-50/50">
            <tr className="text-left text-gray-500 text-[13px] uppercase tracking-wider">
              <th className="p-4 font-medium">Client ID</th>
              <th className="font-medium p-3">Name</th>
              <th className="font-medium p-3">Email</th>
              <th className="font-medium p-3">Account Status</th>
              <th className="font-medium p-3">Role</th>
              <th className="font-medium p-3 text-right">Last Login</th>
              <th className="w-16 p-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  No clients found matching criteria.
                </td>
              </tr>
            ) : (
              clients.map((client) => {
                const style = statusStyles[client.status] || "bg-gray-50 text-gray-600 border border-gray-200";
                const lastLogin = client.lastLoginAt 
                  ? new Date(client.lastLoginAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "Never";

                return (
                  <tr key={client._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 text-gray-500 font-mono text-xs">#{client._id.slice(-6).toUpperCase()}</td>
                    <td className="font-medium text-gray-900 p-3">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="text-gray-600 truncate max-w-[200px] p-3">{client.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-sm text-[11px] font-medium uppercase tracking-wider ${style}`}>
                        {client.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="text-gray-600 capitalize p-3">{client.role}</td>
                    <td className="text-gray-500 text-right p-3">{lastLogin}</td>
                    <td className="p-3 text-right">
                      <Button onClick={() => handleView(client._id)} variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100">
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
