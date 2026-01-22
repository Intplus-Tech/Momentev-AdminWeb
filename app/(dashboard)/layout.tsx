import { LayoutProvider } from "@/context/layout-context";
import AdminNavbar from "./_component/AdminNavbar";
import AppSidebar from "./_component/AppSidebar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <LayoutProvider>
        <div className="h-screen bg-[#F5F5F7] overflow-hidden">
          {/* FIXED NAVBAR */}
          <div className=" left-0 right-0 z-50">
            <AdminNavbar />
          </div>

          {/* BODY */}
          <div className="flex pt-[72px] h-full">
            {/* FIXED SIDEBAR */}
            <AppSidebar />

            {/* SCROLLABLE CONTENT */}
            <main
              className="
                    flex-1
                    h-[calc(100vh-72px)]
                    overflow-y-auto
                    px-4 sm:px-6
                    py-6
                  "
            >
              {children}
            </main>
          </div>
        </div>
      </LayoutProvider>
    </main>
  );
}
