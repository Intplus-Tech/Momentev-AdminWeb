import { getCurrentUser } from "@/lib/actions/auth";
import AppSidebar from "./AppSidebar";

export default async function AppSidebarWrapper() {
  const user = await getCurrentUser();

  return (
    <AppSidebar
      user={{
        name: user?.fullName,
        subdomain: user?.subdomain,
      }}
    />
  );
}
