export default function ActiveDisputes() {
  const rows = [
    ["D-124", "Sarah J.", "Elegant Wed.", "£1,830", "Service Quality", "Oct 27"],
    ["D-123", "James W.", "London Catering", "£2,500", "Vendor No-Show", "Oct 26"],
    ["D-122", "Maria G.", "Premier Venues", "£2,500", "Cancellation", "Oct 25"],
    ["D-121", "Tech Startup", "Magic Moments", "£2,500", "Quality", "Oct 25"],
    ["D-120", "Wedding C.", "City Sounds", "£2,500", "Service Not Rendered", "Oct 24"],
    ["D-119", "Robert C.", "Elegant Wed.", "£2,500", "Payment", "Oct 24"],
  ];

  return (
    <div className="bg-white rounded-xl p-6 overflow-x-auto">
      <h3 className="font-medium mb-4">Active Dispute</h3>
      <table className="min-w-[800px] w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Case ID</th>
            <th>Parties</th>
            <th />
            <th>Amount</th>
            <th>Type</th>
            <th>Filed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <td>{r[0]}</td>
              <td>{r[1]}</td>
              <td className="text-center">↔</td>
              <td>{r[3]}</td>
              <td>{r[4]}</td>
              <td>{r[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
