import SupportRequestsAdminClient from "./_components/SupportRequestsAdminClient";

export default function SupportRequestsPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Support Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review, respond to, and manage all contact and support requests from
          clients and vendors.
        </p>
      </div>

      <SupportRequestsAdminClient />
    </section>
  );
}
