import { getMyProfile } from "@/lib/actions/profile";
import ProfileClient from "./_components/ProfileClient";

export const metadata = {
  title: "My Profile | Momentev Admin",
  description: "View and manage your admin profile",
};

export default async function ProfilePage() {
  const result = await getMyProfile();

  if (!result.success || !result.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-sm">{result.error || "Failed to load profile."}</p>
      </div>
    );
  }

  return <ProfileClient profile={result.data} />;
}
