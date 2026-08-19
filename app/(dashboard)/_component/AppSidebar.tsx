"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  User,
  Wallet,
  AlertTriangle,
  Settings,
  FileText,
  CalendarDays,
  LayersPlus,
  Star,
  MessageSquare,
} from "lucide-react";
import { useLayout } from "@/context/layout-context";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
  requiredPermission?: string;
};

const menu: MenuItem[] = [
  { label: "Overview", icon: Home, href: "/overview", requiredPermission: "analytics:read" },
  { label: "Vendors", icon: Users, href: "/vendors", requiredPermission: "vendors:read" },
  { label: "Clients", icon: User, href: "/clients", requiredPermission: "clients:read" },
  { label: "Financial", icon: Wallet, href: "/financial", requiredPermission: "finance:read" },
  { label: "Bookings", icon: CalendarDays, href: "/bookings", requiredPermission: "bookings:read" },
  { label: "Client Requests", icon: FileText, href: "/customer-requests", requiredPermission: "customer-requests:read" },
  {
    label: "Disputes",
    icon: AlertTriangle,
    href: "/disputes",
    requiredPermission: "disputes:read"
  },
  {
    label: "Support Requests",
    icon: MessageSquare,
    href: "/support-requests",
    requiredPermission: "support:read"
  },
  { label: "Reviews", icon: Star, href: "/admin/reviews", requiredPermission: "reviews:read" },
  { label: "Services", icon: LayersPlus, href: "/services", requiredPermission: "catalog:read" },
  { label: "Settings", icon: Settings, href: "/settings", requiredPermission: "admins:read" },
];

// Profile header component
function ProfileAvatar({
  name,
  email,
  role,
  avatarUrl,
}: {
  name?: string;
  email?: string;
  role?: string;
  avatarUrl?: string | null;
}) {
  const initials = name
    ? name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "AD";

  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 mb-6 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm shrink-0 overflow-hidden">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name || "Profile photo"}
            className="w-full h-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
          {name || "Admin User"}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Admin"}
          {email && ` · ${email}`}
        </p>
      </div>
    </Link>
  );
}

interface AppSidebarProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  avatarUrl?: string | null;
  permissions?: string[];
  isRootAdmin?: boolean;
}

export default function AppSidebar({
  firstName,
  lastName,
  email,
  role,
  avatarUrl,
  permissions = [],
  isRootAdmin = false,
}: AppSidebarProps) {
  const pathname = usePathname();
  const { state, dispatch } = useLayout();

  const fullName =
    firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName || lastName || "Admin User";

  return (
    <>
      {/* MOBILE OVERLAY */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch({ type: "CLOSE" })}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:static
          z-50
          top-18
          w-65
          h-[calc(100vh-72px)]
          bg-white
          px-4 py-6
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        aria-label="Main navigation"
      >
        {/* PROFILE */}
        <ProfileAvatar name={fullName} email={email} role={role} avatarUrl={avatarUrl} />

        {/* MENU */}
        <nav className="space-y-1" role="navigation">
          {menu.map((item) => {
            // Check permissions
            if (!isRootAdmin && item.requiredPermission && !permissions.includes(item.requiredPermission)) {
              return null;
            }

            // Improved active detection
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href + "/"));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => dispatch({ type: "CLOSE" })}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-md transition-colors
                  border-l-4 ${isActive ? "text-primary bg-primary/5 border-primary" : "text-gray-600 border-transparent"}
                  hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon size={18} />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
