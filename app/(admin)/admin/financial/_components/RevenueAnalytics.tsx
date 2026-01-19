export default function RevenueAnalytics() {
  const rows = [
    ["Wedding Service", "45%", "£111,772"],
    ["Corporate Events", "25%", "£60,096"],
    ["Photography", "15%", "£37,257"],
    ["Catering", "8%", "£19,871"],
    ["Planning", "5%", "£12,419"],
    ["Entertainment", "2%", "£4,967"],
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-medium mb-4">Revenue Analytics</h3>

      <div className="space-y-3">
        {rows.map(([name, percent, value]) => (
          <div key={name} className="flex items-center text-sm">
            {/* Name */}
            <span className="flex-1">{name}</span>

            {/* Percentage — centered */}
            <span className="w-20 text-center">{percent}</span>

            {/* Value */}
            <span className="w-28 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
