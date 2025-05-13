
// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import data from "./data.json"
import { lazy, Suspense } from "react"
import ShimmerLoader from "@/components/loadings.tsx/ShimmerLoader"
const ChartAreaInteractive = lazy(() => import("@/components/chart-area-interactive"))
export default function Dashboard() {
  return (
    <>
      {/* <SectionCards /> */}
      <div className="px-4 lg:px-6">
        <Suspense fallback={<div className="w-full h-full"><ShimmerLoader/></div>}>
          <ChartAreaInteractive />
        </Suspense>
        gola
      </div>
      {/* <DataTable data={data} /> */}
    </>
  )
}
