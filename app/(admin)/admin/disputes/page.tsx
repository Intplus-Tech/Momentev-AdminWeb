





import Metrics from "./_components/Metrics";
import UrgentAttention from "./_components/UrgentAttention";
import ActiveDisputes from "./_components/ActiveDisputes";
import EscalatedCases from "./_components/EscalatedCases";
import RecentResolutions from "./_components/RecentResolutions";

export default function DisputesPage() {
  return (
    <section className="w-full space-y-8 bg-[#FFFFFF] rounded">
     
     <Metrics />
      <UrgentAttention />
      <ActiveDisputes />
      <EscalatedCases />
      <RecentResolutions />
    </section>
  );
}
