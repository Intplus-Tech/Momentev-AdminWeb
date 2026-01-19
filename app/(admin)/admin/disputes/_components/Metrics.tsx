export default function Metrics() {
  const metrics = [
    ["Total Disputes", 33],
    ["Active Disputes", 23],
    ["Resolved Disputes", 8],
    ["Escalated Cases", 20],
    ["Disputed Funds", "£18,450"],
  ];

  return (
    <div>
      <h3 className="font-medium mb-4 p-4">Performance metrics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border border-muted/10 rounded-xl p-4 border-[#E6E6E6]">
        {metrics.map(([label, value]) => (
          <div key={label} className="bg-white rounded-xl p-4">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
