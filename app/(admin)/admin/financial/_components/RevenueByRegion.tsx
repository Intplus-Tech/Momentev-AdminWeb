export default function RevenueByRegion() {
  const regions = [
    ["London", "42%", "£104,320"],
    ["Manchester", "18%", "£44,709"],
    ["Birmingham", "12%", "£29,806"],
    ["Leeds", "8%", "£19,871"],
    ["Bristol", "6%", "£14,903"],
    ["Glasgow", "5%", "£12,419"],
    ["Edinburgh", "4%", "£9,935"],
    ["Other", "5%", "£12,419"],
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-medium mb-4">Revenue by Region</h3>
      <div className="space-y-3 text-sm">
        {regions.map(([city, percent, amount]) => (
          <div key={city} className="flex items-center text-sm">
            {/* Name */}
            <span className="flex-1">{city}</span>

            {/* Percentage — centered */}
            <span className="w-20 text-center">{percent}</span>

            {/* Value */}
            <span className="w-28 text-right">{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
