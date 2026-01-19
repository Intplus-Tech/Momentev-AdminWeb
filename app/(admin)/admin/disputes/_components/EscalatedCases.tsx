export default function EscalatedCases() {
  const rows = [
    ["D-124", "£430", "Potential fraud investigation", "Legal review needed", "5 days (Pending)"],
    ["D-119", "£3,200", "High-value, complex liability", "Executive approval needed", "2 days (Pending)"],
    ["D-112", "£430", "Both parties rejected platform solution", "External mediation required", "7 days (Pending)"],
  ];

  return (
    <div className="bg-white rounded-xl p-6 overflow-x-auto">
      <h3 className="font-medium mb-4">Current Escalated (3)</h3>
      <table className="min-w-[900px] w-full text-sm">
        <thead>
          <tr className="text-left">
            <th>Case ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Recommendation</th>
            <th>Timeline</th>
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
