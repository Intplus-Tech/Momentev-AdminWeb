"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  User,
  Wallet,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { useLayout } from "@/context/layout-context";

const menu = [
  { label: "Overview", icon: Home, href: "/overview" },
  { label: "Vendors", icon: Users, href: "/vendors" },
  { label: "Clients", icon: User, href: "/clients" },
  { label: "Financial", icon: Wallet, href: "/financial" },
  {
    label: "Disputes",
    icon: AlertTriangle,
    href: "/disputes",
    badge: 23,
  },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { state, dispatch } = useLayout();

  return (
    <>
      {/* MOBILE OVERLAY */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => dispatch({ type: "CLOSE" })}
        />
      )}

      <aside
        className={`
          fixed md:static
          z-50
          top-[72px]
          w-[260px]
          h-[calc(100vh-72px)]
          bg-white
          px-4 py-6
          overflow-y-auto
          transition-transform
          ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* PROFILE */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/profile-image.png"
            alt="profile"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-sm">Michelle Adeyemi</p>
            <p className="text-[10px] text-muted-foreground">
              thelusyfashion.momentev.com
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="space-y-1">
          {menu.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => dispatch({ type: "CLOSE" })}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-md
                  ${isActive ? "text-[#2B4EFF]" : "text-gray-400"}
                  hover:text-[#2B4EFF]`}
              >
                {isActive && (
                  <span className="absolute left-0 h-[32px] w-[3px] bg-[#2B4EFF] rounded-r" />
                )}
                <item.icon size={18} />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.badge && (
                  <span className="bg-[#2B4EFF] text-white text-xs px-2 py-0.5 rounded-full">
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
