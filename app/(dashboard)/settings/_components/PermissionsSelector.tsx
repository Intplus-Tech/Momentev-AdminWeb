"use client";

import { AdminPermissionGroup } from "@/lib/actions/admins";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PermissionsSelectorProps {
  groups: AdminPermissionGroup[];
  selectedPermissions: string[];
  onChange: (permissions: string[]) => void;
  disabled?: boolean;
}

export default function PermissionsSelector({
  groups,
  selectedPermissions,
  onChange,
  disabled = false,
}: PermissionsSelectorProps) {
  const handleToggle = (permissionName: string, checked: boolean) => {
    const [domain, mode] = permissionName.split(":");
    let updatedPermissions = new Set(selectedPermissions);

    if (checked) {
      updatedPermissions.add(permissionName);
      
      // Automatically check "read" when checking "write", "approve", etc.
      if (mode !== "read") {
        updatedPermissions.add(`${domain}:read`);
      }
    } else {
      updatedPermissions.delete(permissionName);
      
      // Automatically uncheck all other permissions in the domain if "read" is unchecked
      if (mode === "read") {
        for (const p of updatedPermissions) {
          if (p.startsWith(`${domain}:`)) {
            updatedPermissions.delete(p);
          }
        }
      }
    }

    onChange(Array.from(updatedPermissions));
  };

  const handleGroupToggle = (group: AdminPermissionGroup, checked: boolean) => {
    const groupPerms = group.permissions.map((p) => p.name);
    if (checked) {
      const newPerms = new Set([...selectedPermissions, ...groupPerms]);
      onChange(Array.from(newPerms));
    } else {
      onChange(selectedPermissions.filter((p) => !groupPerms.includes(p)));
    }
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
      {groups.map((group) => {
        const groupPerms = group.permissions.map((p) => p.name);
        const isAllSelected = groupPerms.every((p) => selectedPermissions.includes(p));
        const isSomeSelected = groupPerms.some((p) => selectedPermissions.includes(p));

        return (
          <div key={group.domain} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all hover:border-gray-300">
            {/* GROUP HEADER */}
            <div className="flex items-center space-x-3 bg-gray-50/80 px-4 py-3 border-b border-gray-100">
              <Checkbox
                id={`group-${group.domain}`}
                checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
                onCheckedChange={(checked) => handleGroupToggle(group, checked === true)}
                disabled={disabled}
                className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor={`group-${group.domain}`} className="font-semibold text-sm text-gray-800 cursor-pointer select-none">
                {group.label}
              </Label>
            </div>
            
            {/* INDIVIDUAL PERMISSIONS GRID */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
              {group.permissions.map((perm) => (
                <div key={perm.name} className="flex items-center space-x-3 group">
                  <Checkbox
                    id={`perm-${perm.name}`}
                    checked={selectedPermissions.includes(perm.name)}
                    onCheckedChange={(checked) => handleToggle(perm.name, checked === true)}
                    disabled={disabled}
                    className="w-4 h-4 rounded text-blue-600 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label 
                    htmlFor={`perm-${perm.name}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-600 group-hover:text-gray-900 transition-colors capitalize select-none"
                  >
                    {perm.modes.join("/")}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
