"use client";

import { useState } from "react";
import { Check, MoreVertical, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import RoleConfigurationOverlay from "./_components/RoleConfigurationOverlay";
import SecuritySettings from "./_components/SecuritySettings";

interface AdminUser {
  name: string;
  role: string;
  lastLogin: string;
  status: "Active" | "Away";
}

const admins: AdminUser[] = [
  { name: "Michelle Adeyemi", role: "Super Admin", lastLogin: "Today 09:15", status: "Active" },
  { name: "Alex Johnson", role: "Finance Admin", lastLogin: "Yesterday", status: "Active" },
  { name: "Sarah Chen", role: "Support Lead", lastLogin: "Oct 25", status: "Active" },
  { name: "James Wilson", role: "Vendor Manager", lastLogin: "Oct 24", status: "Away" },
  { name: "Maria Garcia", role: "Vendor Support", lastLogin: "Oct 23", status: "Active" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"users" | "security">("users");
  const [showRoles, setShowRoles] = useState(false);

  return (
    <section className="space-y-6 bg-[#FFFFFF] p-10 rounded">
      {/* TOP LEFT BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("users")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-100"
          )}
        >
          {activeTab === "users" && <Check size={16} />} User Management
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm",
            activeTab === "security" ? "bg-blue-600 text-white" : "bg-gray-100"
          )}
        >
          {activeTab === "security" && <Shield size={16} />} Security
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "security" ? (
        <SecuritySettings onSwitchToUsers={() => setActiveTab("users")} />
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Admin List</h3>
            <button
              onClick={() => setShowRoles(true)}
              className="flex items-center gap-2 text-sm hover:text-blue-600"
            >
              <Settings size={16} /> Role Configuration
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Last Login</th>
                  <th className="p-4 text-left">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.name}>
                    <td className="p-4 font-medium">{admin.name}</td>
                    <td>{admin.role}</td>
                    <td>{admin.lastLogin}</td>
                    <td>
                      {admin.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                          <Check size={12} /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-yellow-400" /> Away
                        </span>
                      )}
                    </td>
                    <td className="text-right pr-4">
                      <button className="hover:text-blue-600">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ROLE MODAL */}
      {showRoles && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <RoleConfigurationOverlay onClose={() => setShowRoles(false)} />
        </div>
      )}
    </section>
  );
}
