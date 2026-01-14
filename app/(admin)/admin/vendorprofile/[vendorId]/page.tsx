// page.tsx (Server Component)
import VendorProfileClient from "./vendorprofileclient";

export default function Page({
  params,
}: {
  params: { vendorId: string };
}) {
  return <VendorProfileClient vendorId={params.vendorId} />;
}
