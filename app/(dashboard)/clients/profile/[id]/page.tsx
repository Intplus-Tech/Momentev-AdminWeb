import { notFound } from "next/navigation";
import { getAdminClientById } from "@/lib/actions/clients";
import ClientProfileView from "./_components/ClientProfileView";

interface Props {
  params: { id: string };
}

export default async function ClientProfilePage({ params }: Props) {
  // Await params per Next.js 15+ convention for dynamic segment arguments
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  // Fetch the extended user details
  const clientRes = await getAdminClientById(id);

  if (!clientRes.success || !clientRes.data) {
    // If the vendor ID is purely invalid or an error occurs, we handle it as a 404
    notFound();
  }

  const client = clientRes.data;

  // Render the tailored presentation view
  return (
    <div className="space-y-6">
      <ClientProfileView client={client} />
    </div>
  );
}
