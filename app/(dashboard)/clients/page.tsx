import ActivePagination from "../vendors/_components/ActivePagination";
import CustomersTable from "./_components/CustomersTable";

export default function ClientPage() {
  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Clients</h1>
        <p className="text-muted-foreground text-sm space-x-5">
          <span>12,917 Total Clients</span>
          <span>2,487 Active Clients</span>
        </p>
      </div>
      {/* TABLE */}
      <CustomersTable />
      <ActivePagination currentPage={1} totalPages={1} />
    </div>
  );
}
