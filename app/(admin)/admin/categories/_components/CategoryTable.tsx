"use client";

import { useRouter } from "next/navigation"

export default function CategoryTable() {
  const router = useRouter()

  const rows = [
    {
      id: "C-8921",
      name: "Sarah Johnson",
      location: "London",
      status: "Active",
      type: "Individual",
      orders: 3,
      amount: "£4,830",
      date: "Today 10:30",
    },
    {
      id: "C-8920",
      name: "James Wilson",
      location: "Manchester",
      status: "Active",
      type: "Business",
      orders: 7,
      amount: "£4,830",
      date: "Oct 16",
    },
    {
      id: "C-8919",
      name: "Maria Garcia",
      location: "Birmingham",
      status: "Inactive",
      type: "Individual",
      orders: 0,
      amount: "£4,830",
      date: "Yesterday",
    },
    {
      id: "C-8918",
      name: "Tech Startup",
      location: "Reading",
      status: "Suspended",
      type: "Business",
      orders: 1,
      amount: "£4,830",
      date: "Oct 30",
    },
    {
      id: "C-8917",
      name: "Robert Chen",
      location: "Oxford",
      status: "Active",
      type: "Individual",
      orders: 2,
      amount: "£4,830",
      date: "Oct 25",
    },
  ];

  const statusStyles: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-500 text-white",
  };

  /* ================= HANDLER ================= */

  const handleView = (id: string, status: string) => {
    if (status === "Active") {
      router.push(`/admin/clientprofile/${id}`)
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-500">
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Status</th>
              <th>Type</th>
              <th>Orders</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="p-4 text-gray-600">{row.id}</td>
                <td className="font-medium text-gray-900">{row.name}</td>
                <td className="text-gray-600">{row.location}</td>
                <td>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="text-gray-600">{row.type}</td>
                <td className="text-gray-600">{row.orders}</td>
                <td className="text-gray-600">{row.amount}</td>
                <td className="text-gray-600">{row.date}</td>
                <td className="text-right pr-6 space-x-4">
                  <button
                    onClick={() => handleView(row.id, row.status)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                  <button className="text-blue-600 hover:underline">
                    Actions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
