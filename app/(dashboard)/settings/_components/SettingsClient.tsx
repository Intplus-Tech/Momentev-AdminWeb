"use client";

import { useState } from "react";
import { Check, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateAdminModal from "./CreateAdminModal";
import AdminActions from "./AdminActions";
import SecuritySettings from "./SecuritySettings";
import { AdminUser } from "@/lib/actions/admins";
import { format } from "date-fns";

interface Props {
  initialAdmins: AdminUser[];
}

export default function SettingsClient({ initialAdmins }: Props) {
  const [activeTab, setActiveTab] = useState<"users" | "security">("users");
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "Never";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid Date";
    }
  };

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
        <SecuritySettings />
      ) : (
        <>
          {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Admin List</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCreateAdmin(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Add New Admin
          </button>
        </div>
      </div>

      {/* TABLE */}
          <div className="bg-white rounded-xl overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr>
                  <th className="p-4 text-left whitespace-nowrap">Name</th>
                  <th className="p-4 text-left whitespace-nowrap">Email</th>
                  <th className="p-4 text-left whitespace-nowrap">Role</th>
                  <th className="p-4 text-left whitespace-nowrap">Joined Date</th>
                  <th className="p-4 text-left whitespace-nowrap">Last Login</th>
                  <th className="p-4 text-left whitespace-nowrap">Verified</th>
                  <th className="p-4 text-left whitespace-nowrap">Status</th>
                  <th className="p-4" />
                </tr>
              </thead>
              <tbody>
                {initialAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-muted-foreground">
                      No admins found.
                    </td>
                  </tr>
                ) : (
                  initialAdmins.map((admin) => (
                    <tr key={admin._id}>
                      <td className="p-4 font-medium whitespace-nowrap">
                        {admin.firstName} {admin.lastName}
                        {admin.rootAdmin && (
                          <span className="ml-2 text-xs bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                            Root
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-600 truncate max-w-[200px]" title={admin.email}>{admin.email}</td>
                      <td className="p-4 capitalize whitespace-nowrap">{admin.role}</td>
                      <td className="p-4 whitespace-nowrap">{formatDate(admin.createdAt)}</td>
                      <td className="p-4 whitespace-nowrap">{formatDate(admin.lastLoginAt)}</td>
                      <td className="p-4">
                        {admin.emailVerified ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-4 capitalize whitespace-nowrap">
                        {admin.status === "active" ? (
                          <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                            <Check size={12} /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-yellow-400" /> {admin.status}
                          </span>
                        )}
                      </td>
                      <td className="text-right pr-4">
                        <AdminActions admin={admin} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* CREATE ADMIN MODAL */}
      {showCreateAdmin && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <CreateAdminModal
            onClose={() => setShowCreateAdmin(false)}
            onSuccess={() => setShowCreateAdmin(false)}
          />
        </div>
      )}
    </section>
  );
}
