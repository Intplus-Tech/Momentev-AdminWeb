"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Edit2,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileUser, UpdateProfileData, updateMyProfile } from "@/lib/actions/profile";
import { toast } from "sonner";
import EditProfileModal from "./EditProfileModal";

interface Props {
  profile: ProfileUser;
}

export default function ProfileClient({ profile }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState<ProfileUser>(profile);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "MMM dd, yyyy • h:mm a");
    } catch {
      return "—";
    }
  };

  const formatShortDate = (dateString?: string | null) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "—";
    }
  };

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  const handleUpdateSuccess = (updated: ProfileUser) => {
    setUser(updated);
    setShowEdit(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
          <span className="text-white text-3xl font-semibold tracking-wide">{initials}</span>
        </div>

        {/* Name + Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </h1>
            {user.rootAdmin && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                Root Admin
              </span>
            )}
            {user.emailVerified ? (
              <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                <CheckCircle size={12} /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                <XCircle size={12} /> Unverified
              </span>
            )}
          </div>
          <p className="text-gray-500 mt-1 capitalize">
            {user.role} · {user.authProvider} account
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  user.status === "active" ? "bg-green-500" : "bg-yellow-500"
                }`}
              />
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setShowEdit(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Edit2 size={15} />
          Edit Profile
        </Button>
      </div>

      {/* DETAIL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 border-b pb-3">Contact Information</h2>

          <DetailRow icon={<Mail size={16} />} label="Email" value={user.email} />
          <DetailRow
            icon={<Phone size={16} />}
            label="Phone"
            value={user.phoneNumber ?? "Not set"}
            muted={!user.phoneNumber}
          />
          <DetailRow
            icon={<User size={16} />}
            label="Gender"
            value={user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—"}
          />
          <DetailRow
            icon={<Calendar size={16} />}
            label="Date of Birth"
            value={user.dateOfBirth ? formatShortDate(user.dateOfBirth) : "Not set"}
            muted={!user.dateOfBirth}
          />
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 border-b pb-3">Account Details</h2>

          <DetailRow icon={<Shield size={16} />} label="Role" value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} />
          <DetailRow
            icon={<User size={16} />}
            label="Auth Provider"
            value={user.authProvider.charAt(0).toUpperCase() + user.authProvider.slice(1)}
          />
          <DetailRow
            icon={<Calendar size={16} />}
            label="Member Since"
            value={formatShortDate(user.createdAt)}
          />
          <DetailRow
            icon={<CheckCircle size={16} />}
            label="Has Password"
            value={user.hasPassword ? "Yes" : "No (SSO only)"}
          />
        </div>

        {/* Activity */}
        <div className="bg-white rounded-2xl p-6 space-y-5 md:col-span-2">
          <h2 className="font-semibold text-gray-900 border-b pb-3">Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ActivityCard
              icon={<Clock size={20} className="text-blue-500" />}
              label="Last Login"
              value={formatDate(user.lastLoginAt)}
            />
            <ActivityCard
              icon={<Activity size={20} className="text-green-500" />}
              label="Last Active"
              value={formatDate(user.lastActiveAt)}
            />
            <ActivityCard
              icon={<Calendar size={20} className="text-purple-500" />}
              label="Profile Updated"
              value={formatDate(user.updatedAt)}
            />
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <EditProfileModal
            profile={user}
            onClose={() => setShowEdit(false)}
            onSuccess={handleUpdateSuccess}
          />
        </div>
      )}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-gray-400 flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className={`text-sm mt-0.5 break-all ${muted ? "text-gray-400 italic" : "text-gray-900"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function ActivityCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
