"use client"

import { Title, Text } from "@tremor/react"
import { Grid, Col } from "@tremor/react"
import StockChart from "./components/StockChart"
import NewsFeed from "./components/NewsFeed"

// const newsData = [
//   {
//     id: 1,
//     title: "Company Announces New Sustainable Initiative",
//     date: "2024-02-04",
//     summary: "Leading the way in environmental responsibility with new carbon reduction goals.",
//   },
//   {
//     id: 2,
//     title: "Q4 Earnings Beat Expectations",
//     date: "2024-02-03",
//     summary: "Strong performance in renewable energy sector drives growth.",
//   },
//   {
//     id: 3,
//     title: "Strategic Partnership Announced",
//     date: "2024-02-02",
//     summary: "New collaboration to develop sustainable technology solutions.",
//   },
// ]

export default function Dashboard() {
  return (
    <div className="p-6 bg-white min-h-screen">
      <Title className="text-black font-bold text-2xl">Company Dashboard</Title>
      <Text className="text-black">Positive news</Text>

      <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
        <Col numColSpan={1}>
          <StockChart
            data={[]}
            currentPrice={160.45}
          />
        </Col>
        <Col numColSpan={1}>
          <NewsFeed company={companyId} />
        </Col>
      </Grid>
    </div>
  )
}

