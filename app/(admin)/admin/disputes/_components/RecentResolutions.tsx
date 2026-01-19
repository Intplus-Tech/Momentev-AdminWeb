export default function RecentResolutions() {
  const rows = [
    ["D-118", "Oct 26", "Partial Refund", "£320"],
    ["D-117", "Oct 25", "Vendor Credit", "£650"],
    ["D-116", "Oct 24", "Full Refund", "£1,200"],
    ["D-115", "Oct 23", "Denied", "£850"],
    ["D-114", "Oct 22", "Mediated", "£2,100"],
  ];

  return (
    <div className="bg-white rounded-xl p-6 overflow-x-auto">
      <h3 className="font-medium mb-4">Recent Resolutions</h3>
      <table className="min-w-[600px] w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Case ID</th>
            <th>Date Closed</th>
            <th>Resolution</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
