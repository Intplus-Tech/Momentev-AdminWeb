import ActivePagination from "../vendors/_components/ActivePagination";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getAdminClients } from "@/lib/actions/clients";

// Match the search params standard
interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ClientPage({ searchParams }: SearchParamsProps) {
  // Await search parameters before usage NextJS 15+ standard
  const params = await searchParams;
  
  const page = typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = typeof params?.limit === "string" ? parseInt(params.limit, 10) : 10;
  const search = typeof params?.search === "string" ? params.search : "";
  const status = typeof params?.status === "string" ? params.status : "all";

  const { success, data: clients = [], total = 0, error } = await getAdminClients(page, limit, search, status);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Clients</h1>
        <p className="text-muted-foreground text-sm space-x-5">
          <span>{total.toLocaleString()} Total Clients</span>
          {/* Note: In a production app you'd likely fetch an aggregate count specifically for "Active" ones,  */}
          {/* but here we are using the returned count if filtering by active. For now just show total */}
        </p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <DataTable columns={columns} data={clients} />
      
      {totalPages > 0 && (
        <ActivePagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
