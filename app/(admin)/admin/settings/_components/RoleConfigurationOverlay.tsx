"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onClose: () => void;
}

const modules = ["Dashboard", "Vendor Mgt", "Financial", "Disputes", "Settings"];
const roles = ["Super", "Finance", "Vendor", "Support"];

export default function RoleConfigurationOverlay({ onClose }: Props) {
  const [permissions, setPermissions] = useState<
    Record<string, Record<string, boolean>>
  >(() =>
    Object.fromEntries(
      modules.map((module) => [
        module,
        Object.fromEntries(roles.map((role) => [role, true])),
      ])
    )
  );

  const togglePermission = (module: string, role: string) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [role]: !prev[module][role],
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl w-full max-w-4xl p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Role Configuration</h2>
        <button onClick={onClose}>
          <X className="hover:text-red-500" />
        </button>
      </div>

      {/* ROLES LIST */}
      <div className="space-y-2 text-sm">
        {[
          "Super Admin – Full system access",
          "Finance Admin – All financial modules",
          "Vendor Manager – Vendor management only",
          "Support Admin – Support & disputes",
          "Content Moderator – Reviews & content",
        ].map((text) => (
          <div
            key={text}
            className="flex items-center justify-between max-w-[420px]"
          >
            <span>• {text}</span>
            <button type="button">
              <X className="text-[#FF473E]" size={16} />
            </button>
          </div>
        ))}
         <div className="flex items-center">
          <input
            type="text"
            className="border rounded w-[366px] border-[#D9D9D9] h-[32px]"
          />
          <span> <X className="text-[#FF473E]" size={16} /></span>
          <Check
            className="text-green-600 ml-2"
            size={12}
            strokeWidth={3}
          />
         </div>
        

        <div>
          <button className="text-blue-600 text-sm hover:underline">
            + Add New Role
          </button>
        </div>
      </div>

      {/* PERMISSION MATRIX */}
      <div className="border rounded-lg p-4 overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2">Module</th>
              <th>Super</th>
              <th>Finance</th>
              <th>Vendor</th>
              <th>Support</th>
            </tr>
          </thead>

          <tbody>
            {modules.map((module) => (
              <tr key={module} className="last:border-0">
                <td className="py-2 font-medium">{module}</td>

                {roles.map((role) => {
                  const checked = permissions[module][role];

                  return (
                    <td key={role} className="text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePermission(module, role)}
                          className="peer hidden"
                        />
                        <span
                          className={`
                            w-4 h-4 rounded border flex items-center justify-center
                            ${checked
                              ? "bg-green-600 border-green-600"
                              : "border-gray-300"
                            }
                          `}
                        >
                          {checked && (
                            <Check
                              className="text-white"
                              size={12}
                              strokeWidth={3}
                            />
                          )}
                        </span>
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-start gap-3">

        <Button className="w-[146px]">Save</Button>
        <Button variant="secondary" onClick={onClose} className="w-[146x]">
          Cancel
        </Button>
       
      </div>
    </div>
  );
}
