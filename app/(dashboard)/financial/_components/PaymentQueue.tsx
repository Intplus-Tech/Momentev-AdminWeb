import {
  CheckCircle,
  XCircle,
  Hourglass,
  AlertTriangle,
} from "lucide-react";

export default function PaymentQueue() {
  const rows = [
    ["14:30", "TX-9013", "Sarah Johnson", "Elegant Weddings", "£1,830", "Success"],
    ["14:25", "TX-9012", "James Wilson", "London Catering", "£2,500", "Success"],
    ["14:20", "TX-9011", "Marcia Garcia", "Elegant Weddings", "£650", "Failed"],
    ["14:15", "TX-9010", "Tech Startup", "Premier Venues", "£1,230", "Pending"],
    ["14:10", "TX-9009", "Wedding Couple", "Magic Moments", "£430", "Success"],
    ["14:05", "TX-9008", "Robert Chen", "City Sounds DJ", "£320", "Review"],
  ];

  const actionIcon = (status: string) => {
    switch (status) {
      case "Success":
        return <CheckCircle size={16} className="text-green-600" />;
      case "Failed":
        return <XCircle size={16} className="text-red-600" />;
      case "Pending":
        return <Hourglass size={16} className="text-yellow-500" />;
      case "Review":
        return <AlertTriangle size={16} className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 overflow-x-auto">
      <h3 className="font-medium mb-4 text-[#191919] font-semibold">
        Payment Queue
      </h3>

      <table className="min-w-[900px] w-full text-sm">
        <thead>
          <tr className="text-left text-[#191919]">
            <th>Time</th>
            <th>Transaction ID</th>
            <th>Client</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r[1]}>
              {r.map((cell, i) => (
                <td key={i} className="py-3">
                  {i === 5 ? (
                    <span className="flex items-center gap-2">
                      {actionIcon(cell)}
                      {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
