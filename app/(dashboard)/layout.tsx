import { LayoutProvider } from "@/context/layout-context";
import AdminNavbar from "./_component/AdminNavbar";
import AppSidebar from "./_component/AppSidebar";
import { getMyProfile } from "@/lib/actions/profile";

export default async function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileResult = await getMyProfile();
  const profile = profileResult.success ? profileResult.data : null;

  return (
    <div>
      <LayoutProvider>
        <div className="h-screen bg-[#F5F5F7] overflow-hidden">
          {/* FIXED NAVBAR */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <AdminNavbar />
          </div>

          {/* BODY */}
          <div className="flex pt-[72px] h-full">
            {/* FIXED SIDEBAR */}
            <AppSidebar
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              email={profile?.email}
              role={profile?.role}
            />

            {/* SCROLLABLE CONTENT */}
            <div
              className="
                    flex-1
                    h-[calc(100vh-72px)]
                    overflow-y-auto
                    px-4 sm:px-6
                    py-6
                    max-w-[1920px]
                    mx-auto
                    w-full
                  "
            >
              {children}
            </div>
          </div>
        </div>
      </LayoutProvider>
    </div>
  );
}
