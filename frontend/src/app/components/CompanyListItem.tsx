"use client"

import { Card, Title, Text, AreaChart } from "@tremor/react";
import Link from "next/link"

interface CompanyData {
  id: string
  name: string
  ticker: string
  price: number
  change: number
  chartData: { date: string; price: number }[]
}

export default function CompanyListItem({ company }: { company: CompanyData }) {
  return (
    <Link href={`/dashboard/${company.id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <Title className="text-black font-bold">{company.name}</Title>
            <Text className="text-gray-700">{company.ticker}</Text>
          </div>
          <div className="text-right">
            <Text className="font-bold text-black">${company.price.toFixed(2)}</Text>
            <Text className={company.change >= 0 ? "text-green-700" : "text-red-700"}>
              {company.change >= 0 ? "+" : ""}
              {company.change.toFixed(2)}%
            </Text>
          </div>
        </div>
        <AreaChart
          className="mt-4 h-24"
          data={company.chartData}
          index="date"
          categories={["price"]}
          colors={["green"]}
          showXAxis={false}
          showYAxis={false}
          showLegend={false}
          showGridLines={false}
          showAnimation={false}
          startEndOnly={true}
          showTooltip={false}
        />
      </Card>
    </Link>
  )
}

