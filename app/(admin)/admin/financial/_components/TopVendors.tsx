export default function TopVendors() {
  const vendors = [
    ["Elegant Weddings", "£89,200", "↑ 28%"],
    ["London Catering", "£42,150", "↑ 15%"],
    ["Premier Venues", "£38,750", "↑ 28%"],
    ["Elegant Weddings", "£24,800", "↓ 28%"],
    ["Elegant Weddings", "£18,600", "↑ 28%"],
  ];

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="font-medium mb-4">Top Performing Vendors</h3>
      <div className="space-y-3 text-sm">
        {vendors.map((v, i) => (
          <div key={i} className="flex justify-between">
            <span className="flex-1">{i + 1}. {v[0]}</span>
            <span className="w-20 text-center">{v[1]}</span>
            <span className="w-28 text-right">{v[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


