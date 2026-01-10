import { TrendingUp } from "lucide-react"

export default function OverviewCard() {
  return (
    <div
      className="
        flex gap-3
        overflow-x-auto
        lg:grid lg:grid-cols-5
        lg:overflow-visible
      "
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="
            bg-white rounded-xl
            flex-shrink-0
            w-[160px] sm:w-[180px] lg:w-full
            p-3 sm:p-4
            space-y-3
          "
        >
          <div className="space-y-1">
            <h2 className="text-[12px] sm:text-[14px] font-black">
              Active user
            </h2>
            <p className="text-[18px] sm:text-[22px] font-semibold">
              4,992
            </p>
          </div>

          <p className="flex items-center gap-1 text-[7px] sm:text-[8px]">
            <span className="text-[#6DD58C]">
              <TrendingUp size={12} />
            </span>
            <span className="font-bold">
              + 12.5 % (last month)
            </span>
          </p>
        </div>
      ))}
    </div>
  )
}
