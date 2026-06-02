import { getAdmins, getRolesAndPermissions } from "@/lib/actions/admins";
import SettingsClient from "./_components/SettingsClient";

interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SettingsPage({ searchParams }: SearchParamsProps) {
  // Await search parameters before usage for Next.js 15+ standard
  const params = await searchParams;
  
  const page = typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = typeof params?.limit === "string" ? parseInt(params.limit, 10) : 10;
  const search = typeof params?.search === "string" ? params.search : "";
  const status = typeof params?.status === "string" ? params.status : "all";

  const [adminsRes, rolesRes] = await Promise.all([
    getAdmins(page, limit, search, status),
    getRolesAndPermissions()
  ]);

  const { success, data: admins = [], error } = adminsRes;
  const rolesAndPermissions = rolesRes.success && rolesRes.data ? rolesRes.data : null;

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      <SettingsClient 
        initialAdmins={admins} 
        rolesAndPermissions={rolesAndPermissions} 
      />
    </>
  );
}
