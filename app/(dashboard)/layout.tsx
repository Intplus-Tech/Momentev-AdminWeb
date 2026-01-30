import { LayoutProvider } from "@/context/layout-context";
import AdminNavbar from "./_component/AdminNavbar";

import AppSidebarWrapper from "./_component/AppSidebarWrapper";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
           <AppSidebarWrapper/>

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
