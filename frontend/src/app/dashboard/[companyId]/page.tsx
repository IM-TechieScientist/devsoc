"use client"

import { useParams } from "next/navigation"
import { Title, Text } from "@tremor/react"
import { Grid, Col } from "@tremor/react"
import StockChart from "../components/StockChart"
import NewsFeed from "../components/NewsFeed"

// Sample company data (in a real app, you'd fetch this based on the companyId)
const companiesData = {
  "1": {
    name: "Green Energy Co",
    ticker: "GEC",
    currentPrice: 145.32,
  },
  "2": {
    name: "Sustainable Tech",
    ticker: "STECH",
    currentPrice: 89.75,
  },
  "3": {
    name: "Eco Friendly Manufacturing",
    ticker: "EFM",
    currentPrice: 210.5,
  },
}

const newsData = [
  {
    id: 1,
    title: "Company Announces New Sustainable Initiative",
    date: "2024-02-04",
    summary: "Leading the way in environmental responsibility with new carbon reduction goals.",
  },
  {
    id: 2,
    title: "Q4 Earnings Beat Expectations",
    date: "2024-02-03",
    summary: "Strong performance in renewable energy sector drives growth.",
  },
  {
    id: 3,
    title: "Strategic Partnership Announced",
    date: "2024-02-02",
    summary: "New collaboration to develop sustainable technology solutions.",
  },
]

export default function Dashboard() {
  const params = useParams()
  const companyId = params.companyId as string
  const company = companiesData[companyId as keyof typeof companiesData]

  if (!company) {
    return <div>Company not found</div>
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <Title>
        {company.name} ({company.ticker}) Dashboard
      </Title>
      <Text>Real-time stock data and news updates</Text>

      <Grid numItems={1} numItemsSm={2} className="gap-6 mt-6">
        <Col numColSpan={1}>
          <StockChart
            data={[]} // This prop is now handled internally in the StockChart component
            currentPrice={company.currentPrice}
          />
        </Col>
        <Col numColSpan={1}>
          <NewsFeed company={companyId} />
        </Col>
      </Grid>
    </div>
  )
}

