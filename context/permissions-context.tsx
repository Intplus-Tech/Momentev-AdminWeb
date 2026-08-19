"use client";

import React, { createContext, useContext } from "react";

type PermissionsContextType = {
  permissions: string[];
  isRootAdmin: boolean;
  hasPermission: (permission: string) => boolean;
};

const PermissionsContext = createContext<PermissionsContextType | null>(null);

export function PermissionsProvider({
  children,
  permissions = [],
  isRootAdmin = false,
}: {
  children: React.ReactNode;
  permissions?: string[];
  isRootAdmin?: boolean;
}) {
  const hasPermission = (permission: string) => {
    if (isRootAdmin) return true;
    return permissions.includes(permission);
  };

  return (
    <PermissionsContext.Provider value={{ permissions, isRootAdmin, hasPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
}
