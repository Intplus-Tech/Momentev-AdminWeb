import { ChevronDown } from "lucide-react";

export default function UrgentAttention() {
  const rows = [
    ["D-124", "£1,830", "Service quality", "48h window ends"],
    ["D-119", "£3,200", "Vendor no-show (Escalated)", "Escalated"],
    ["D-112", "£850", "Payment dispute", "Legal review needed"],
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-medium mb-4">Urgent Attention</h3>
      <div className="space-y-4">
        {rows.map(([id, amount, issue, status]) => (
          <div
            key={id}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm items-center"
          >
            <span>{id}:</span>
            <span>{amount}</span>
            <span className="md:col-span-2">{issue}</span>
            <div className="flex items-center justify-between text-blue-600 cursor-pointer">
              <span>{status}</span>
              <span className="flex items-center gap-1">
                Details <ChevronDown size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
