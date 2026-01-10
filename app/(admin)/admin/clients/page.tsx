export default function ClientPage() {
  return (
    <div className="space-y-6">

      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          client Management
        </h1>
        <p className="text-muted-foreground text-sm">
          2,487 Active Vendors
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="font-medium text-[#2B4EFF]">
              All (145)
            </span>
            <span>Pending Review 12</span>
            <span>Recently Approved 3</span>
            <span>Flagged 3</span>
            <span>Suspended 3</span>
          </div>

          {/* ACTION */}
          <button className="self-start sm:self-auto px-4 py-2 rounded-lg bg-gray-100 text-sm">
            Download
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">

        {/* MOBILE SCROLL WRAPPER */}
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4">ID</th>
                <th>Business Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Rating</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {["Elegant Weddings", "London Catering"].map((name, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="p-4">V-789{i}</td>
                  <td className="font-medium">{name}</td>
                  <td>Photography</td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs">
                      Active
                    </span>
                  </td>
                  <td>★★★★★</td>
                  <td className="text-[#2B4EFF] whitespace-nowrap space-x-4">
                    <button>Edit</button>
                    <button>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}
