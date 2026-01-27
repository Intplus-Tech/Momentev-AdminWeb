export default function MetricCards() {
  const metrics = [
    { title: "Total Revenue", value: "£248,382" },
    { title: "Pending Payout", value: "£42,150" },
    { title: "Active Escrow", value: "£156,820", sub: "Transaction: 342" },
    { title: "Platform Comm.", value: "£24,838" },
    { title: "Disputed Funds", value: "£18,450", sub: "Cases: 23" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {metrics.map((item) => (
        <div key={item.title} className="bg-white rounded-xl p-4 space-y-2">
          <p className="text-sm text-gray-500">{item.title}</p>
          <p className="text-xl font-semibold">{item.value}</p>
          {item.sub && <p className="text-xs text-gray-400">{item.sub}</p>}
        </div>
      ))}
    </div>
  );
}
