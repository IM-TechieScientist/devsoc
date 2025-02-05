// "use client"

// import { Card, Title, Text, AreaChart } from "@tremor/react"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
// import { useState } from "react"

// interface StockData {
//   date: string
//   price: number
//   volume: number
// }

// interface StockChartProps {
//   data: StockData[]
//   currentPrice: number
// }

// type TimePeriod = "daily" | "monthly" | "yearly"

// export default function StockChart({ data, currentPrice }: StockChartProps) {
//   const [timePeriod, setTimePeriod] = useState<TimePeriod>("monthly")

//   // Sample data for different time periods
//   const timePeriodsData = {
//     daily: [
//       { date: "Feb 1", price: 158.32, volume: 2100000 },
//       { date: "Feb 2", price: 159.45, volume: 2300000 },
//       { date: "Feb 3", price: 160.45, volume: 2800000 },
//       { date: "Feb 4", price: 161.2, volume: 2600000 },
//       { date: "Feb 5", price: 160.78, volume: 2400000 },
//     ],
//     monthly: [
//       { date: "Sep 23", price: 150.23, volume: 2500000 },
//       { date: "Oct 23", price: 145.78, volume: 3100000 },
//       { date: "Nov 23", price: 155.45, volume: 2800000 },
//       { date: "Dec 23", price: 158.9, volume: 2900000 },
//       { date: "Jan 24", price: 160.45, volume: 3000000 },
//     ],
//     yearly: [
//       { date: "2020", price: 120.45, volume: 28000000 },
//       { date: "2021", price: 135.67, volume: 31000000 },
//       { date: "2022", price: 145.89, volume: 29000000 },
//       { date: "2023", price: 155.34, volume: 30000000 },
//       { date: "2024", price: 160.45, volume: 32000000 },
//     ],
//   }

//   const currentData = timePeriodsData[timePeriod]

//   return (
//     <>
//       <Card className="bg-white">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <Title className="text-black font-bold">Stock Performance</Title>
//             <Text className="text-black">Current Price: ${currentPrice.toFixed(2)}</Text>
//           </div>
//           <ToggleGroup
//             type="single"
//             value={timePeriod}
//             onValueChange={(value) => value && setTimePeriod(value as TimePeriod)}
//             className="justify-end"
//           >
//             <ToggleGroupItem value="daily" aria-label="Daily view">
//               <span className="px-2 text-black">Daily</span>
//             </ToggleGroupItem>
//             <ToggleGroupItem value="monthly" aria-label="Monthly view">
//               <span className="px-2 text-black">Monthly</span>
//             </ToggleGroupItem>
//             <ToggleGroupItem value="yearly" aria-label="Yearly view">
//               <span className="px-2 text-black">Yearly</span>
//             </ToggleGroupItem>
//           </ToggleGroup>
//         </div>
//         <AreaChart
//           className="mt-4 h-72"
//           data={currentData}
//           index="date"
//           categories={["price"]}
//           colors={["#2F855A"]}
//           valueFormatter={(number) => `$${number.toFixed(2)}`}
//           yAxisWidth={60}
//         />
//       </Card>

//       <Card className="mt-6 bg-white">
//         <Title className="text-black font-bold">Trading Volume</Title>
//         <AreaChart
//           className="mt-4 h-48"
//           data={currentData}
//           index="date"
//           categories={["volume"]}
//           colors={["#3182CE"]}
//           valueFormatter={(number) => number.toLocaleString()}
//           yAxisWidth={100}
//         />
//       </Card>
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Title, Text, TextInput, Card } from "@tremor/react"
import { Button } from "@/components/ui/button"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
)

export default function CompaniesPage() {
  const [companyName, setCompanyName] = useState("")
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://192.168.141.150:6969/long_stocks/${companyName}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      console.log('Fetched data:', data)

      // Clean the data by removing any leading/trailing special characters
      const cleanedData = data.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim()

      // Split the cleaned data into lines
      const lines = cleanedData.split('\n')

      // Extract the header (first line) and the first data row
      const header = lines[0].split(',') // ["Open", "Close", "Volume"]
      const firstDataRow = lines[1].split(',') // ["0", "187.23273981487074", "186.76502990722656", "69668800"]

      // Extract the current price from the "Open" value
      const currentPrice = parseFloat(firstDataRow[1])
      setCurrentPrice(currentPrice)

      // Parse the data for the chart
      const parsedData = lines.slice(1).map((line, index) => {
        const values = line.split(',')
        return {
          day: index,
          open: parseFloat(values[1]),
          close: parseFloat(values[2]),
          volume: parseInt(values[3], 10)
        }
      }).filter(item => !isNaN(item.open))

      // Prepare data for Chart.js
      const chartData = {
        labels: parsedData.map(item => `Day ${item.day}`),
        datasets: [
          {
            label: 'Open Price',
            data: parsedData.map(item => item.open),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Close Price',
            data: parsedData.map(item => item.close),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      }

      setChartData(chartData)

    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <Title className="text-black font-bold text-2xl">Company Stock Analysis</Title>
      
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-4">
          <TextInput
            className="flex-grow"
            placeholder="Enter company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Button type="submit">
            Fetch Data
          </Button>
        </div>
      </form>

      {currentPrice && (
        <Text className="mt-4 text-lg font-semibold">
          Current Price: ${currentPrice.toFixed(2)}
        </Text>
      )}

      {chartData && (
        <Card className="mt-6">
          <Title className="text-black font-bold">Stock Price History</Title>
          <div className="h-[400px] mt-4">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    title: {
                      display: true,
                      text: 'Price ($)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Days'
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Stock Price Trends'
                  }
                }
              }}
            />
          </div>
        </Card>
      )}
    </div>
  )
}