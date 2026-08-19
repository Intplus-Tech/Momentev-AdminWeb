import DisputesAdminClient from "./_components/DisputesAdminClient";

export default function DisputesPage() {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Dispute Management</h1>
        <p className="text-sm text-muted-foreground">
          Admin escalation and resolution workflows powered by live dispute
          endpoints.
        </p>
      </div>

      <DisputesAdminClient />
    </section>
  );
}
