export default function BookingsTable() {
  const rows = [
    {
      id: "B-9013",
      client: "Sarah Johnson",
      service: "Wedding Photography",
      date: "Oct 28, 2024",
      status: "Held (Dispute Active)",
      payment: "Escrow",
      amount: "£2,500",
      action: "Quick Actions",
    },
    {
      id: "B-9011",
      client: "James Wilson",
      service: "Wedding Photography",
      date: "Oct 28, 2024",
      status: "Confirmed",
      payment: "Paid",
      amount: "£2,500",
      action: "Analytics",
    },
    {
      id: "B-9010",
      client: "Maria Garcia",
      service: "Wedding Photography",
      date: "Oct 28, 2024",
      status: "Completed",
      payment: "Paid",
      amount: "£650",
      action: "View",
    },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        A
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{row.id}</td>
              <td className="p-3">{row.client}</td>
              <td className="p-3">{row.service}</td>
              <td className="p-3">{row.date}</td>
              <td className="p-3">{row.status}</td>
              <td className="p-3">{row.payment}</td>
              <td className="p-3">{row.amount}</td>
              <td className="p-3 text-blue-600 cursor-pointer">{row.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
