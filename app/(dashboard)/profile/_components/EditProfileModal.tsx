"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProfileUser, UpdateProfileData, updateMyProfile } from "@/lib/actions/profile";
import { toast } from "sonner";

interface Props {
  profile: ProfileUser;
  onClose: () => void;
  onSuccess: (updated: ProfileUser) => void;
}

export default function EditProfileModal({ profile, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<UpdateProfileData>({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber ?? "",
    dateOfBirth: profile.dateOfBirth?.split("T")[0] ?? "",
    gender: profile.gender,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Strip empty strings before sending
    const payload: UpdateProfileData = {};
    if (formData.firstName) payload.firstName = formData.firstName;
    if (formData.lastName) payload.lastName = formData.lastName;
    if (formData.phoneNumber) payload.phoneNumber = formData.phoneNumber;
    if (formData.dateOfBirth) payload.dateOfBirth = formData.dateOfBirth;
    if (formData.gender) payload.gender = formData.gender;

    try {
      const response = await updateMyProfile(payload);
      if (response.success && response.data) {
        onSuccess(response.data);
      } else {
        setError(response.error || "Failed to update profile");
        toast.error(response.error || "Failed to update profile");
      }
    } catch {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Edit Profile</h2>
        <button onClick={onClose} disabled={loading} aria-label="Close">
          <X className="text-gray-500 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber ?? ""}
            onChange={handleChange}
            placeholder="+1234567890"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth ?? ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(val) => setFormData({ ...formData, gender: val })}
            disabled={loading}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
