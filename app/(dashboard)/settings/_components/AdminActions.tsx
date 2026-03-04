"use client";

import { useState } from "react";
import { MoreVertical, Edit2, ShieldOff, ShieldAlert, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminUser, deleteAdmin, deactivateAdmin, reactivateAdmin } from "@/lib/actions/admins";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditAdminModal from "./EditAdminModal";

interface Props {
  admin: AdminUser;
}

export default function AdminActions({ admin }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirmAction, setShowConfirmAction] = useState<"delete" | "deactivate" | "reactivate" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!showConfirmAction) return;

    setLoading(true);
    try {
      let response;
      if (showConfirmAction === "delete") {
        response = await deleteAdmin(admin.id);
      } else if (showConfirmAction === "deactivate") {
        response = await deactivateAdmin(admin.id);
      } else if (showConfirmAction === "reactivate") {
        response = await reactivateAdmin(admin.id);
      }

      if (response?.success) {
        toast.success(
          `Admin successfully ${
            showConfirmAction === "delete" ? "deleted" : showConfirmAction + "d"
          }`
        );
        setShowConfirmAction(null);
      } else {
        toast.error(response?.error || "Failed to perform action");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (admin.rootAdmin) {
    return (
      <span className="text-gray-400 text-xs italic px-2">No actions</span>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="text-gray-500 hover:text-blue-600 transition-colors p-2">
            <MoreVertical size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => setShowEdit(true)}
            className="cursor-pointer"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>

          {admin.status === "active" ? (
            <DropdownMenuItem
              onClick={() => setShowConfirmAction("deactivate")}
              className="cursor-pointer text-yellow-600"
            >
              <ShieldOff className="mr-2 h-4 w-4" />
              <span>Deactivate</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => setShowConfirmAction("reactivate")}
              className="cursor-pointer text-green-600"
            >
              <ShieldAlert className="mr-2 h-4 w-4" />
              <span>Reactivate</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={() => setShowConfirmAction("delete")}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Admin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* REUSABLE ACTION CONFIRMATION DIALOG */}
      <AlertDialog
        open={Boolean(showConfirmAction)}
        onOpenChange={(open) => !open && setShowConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {showConfirmAction === "delete"
                ? "Delete Admin?"
                : showConfirmAction === "deactivate"
                ? "Deactivate Admin?"
                : "Reactivate Admin?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {showConfirmAction === "delete"
                ? "Are you sure you want to permanently delete this admin? This action cannot be undone."
                : showConfirmAction === "deactivate"
                ? "This admin will no longer be able to log in or perform actions until reactivated."
                : "This admin will regain access to their account."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button
              variant={showConfirmAction === "delete" ? "destructive" : "default"}
              onClick={handleAction}
              disabled={loading}
              className={showConfirmAction === "deactivate" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {showConfirmAction === "delete" ? "Delete" : "Confirm"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <EditAdminModal
            admin={admin}
            onClose={() => setShowEdit(false)}
            onSuccess={() => setShowEdit(false)}
          />
        </div>
      )}
    </>
  );
}
