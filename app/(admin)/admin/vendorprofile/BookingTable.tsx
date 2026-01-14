/* ================= RECENT BOOKINGS TABLE ================= */
"use client";
type BookingStatus = "Paid" | "Held";

interface Booking {
  id: string;
  client: string;
  service: string;
  date: string;
  amount: string;
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: "B-9013",
    client: "Sarah Johnson",
    service: "Wedding Photo",
    date: "Oct 28",
    amount: "£1,830",
    status: "Held",
  },
  {
    id: "B-9011",
    client: "James Wilson",
    service: "Corporate Event",
    date: "Oct 28",
    amount: "£2,500",
    status: "Paid",
  },
  {
    id: "B-9010",
    client: "Maria Garcia",
    service: "Engagement Shoot",
    date: "Oct 28",
    amount: "£650",
    status: "Paid",
  },
  {
    id: "B-9009",
    client: "Tech Startup",
    service: "Product Shoot",
    date: "Oct 28",
    amount: "£1,230",
    status: "Held",
  },
  {
    id: "B-9008",
    client: "Wedding Couple",
    service: "Pre-Wedding Shoot",
    date: "Oct 28",
    amount: "£430",
    status: "Paid",
  },
];

export function BookingTable() {
  return (
    <div className="space-y-4">
      <h3 className="text-[20px] font-medium text-[#191919]">
        Recent Bookings
      </h3>

      <div className="overflow-x-auto rounded-xl  ">
        <table className="min-w-full text-[16px]">
          <thead>
            <tr className="border-b border-gray-400 text-[#1D1B20]">
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">Client</th>
              <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">
                Service
              </th>
              <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className=" last:border-0"
              >
                <td className="px-4 py-3 text-[#1D1B20] text-[16px]">
                  {booking.id}
                </td>

                <td className="px-4 py-3 text-[#1D1B20] text-[16px]">
                  {booking.client}
                </td>

                <td className="px-4 py-3 text-[#1D1B20] hidden sm:table-cell text-[16px]">
                  {booking.service}
                </td>

                <td className="px-4 py-3 text-[#1D1B20] hidden md:table-cell text-[16px]">
                  {booking.date}
                </td>

                <td className="px-4 py-3 text-[#1D1B20] text-[16px]">
                  {booking.amount}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium ${booking.status === "Paid"
                        ? "text-emerald-400"
                        : "text-amber-400"
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
