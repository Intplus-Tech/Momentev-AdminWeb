import PendingPayoutsClient from "./_components/pending-payouts-client";

export default async function PendingPayoutsPage() {
  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-6 bg-[#F4F5F8] min-h-[calc(100vh-72px)]">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Pending Payouts</h1>
          <p className="text-sm text-gray-500">
            Review completed split payments and release vendor funds.
          </p>
        </div>
      </div>

      <PendingPayoutsClient initialPage={1} initialLimit={20} />
    </section>
  );
}