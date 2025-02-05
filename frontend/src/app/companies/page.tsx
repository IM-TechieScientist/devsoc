
// "use client"

// import { useEffect, useState } from "react"
// import { Title, Text, TextInput, Card } from "@tremor/react"
// import { Button } from "@/components/ui/button"
// // import {debounce} from "lodash"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title as ChartTitle,
//   Tooltip,
//   Legend
// } from "chart.js"
// import { Line } from "react-chartjs-2"
// import NewsDisplay from './NewsDisplay'
// import SecReports from "./esgandsdg"
// import EsgAndSdg from "./esgandsdg"

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend)


// const delay = (ms: number) => new Promise ( resolve => setTimeout(resolve,ms));


// export default function CompaniesPage() {
//   const [companyName, setCompanyName] = useState("")
//   const [debouncedCompanyName, setDebouncedCompanyName] = useState("")
//   const [currentPrice, setCurrentPrice] = useState<number | null>(null)
//   const [chartData, setChartData] = useState<any>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [secRecord, setSecRecord] = useState<string | null>(null)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedCompanyName(companyName)
//     }, 300)

//     return () => clearTimeout(handler) // Cleanup previous timeout
//   }, [companyName])
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!companyName.trim()) return

//     setLoading(true)
//     setError(null)

//     try {
//       await delay(2000);
//       const response = await fetch(`http://192.168.24.150:6969/long_stocks/${companyName}`)
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json(); // Parse JSON
      
//       if (!Array.isArray(data) || !data.every(Array.isArray)) {
//         throw new Error("Unexpected data format! Expected an array of arrays.");
//       }
//       console.log("Fetched Data:", data)


//       const lines = data

//       const firstDataRow = lines[1] // Example: ["0", "187.23", "186.76", "69668800"]

//       // Ensure valid data parsing
//       if (firstDataRow.length < 3) throw new Error("Insufficient data")

//       // Extract current price
//       const currentPrice = parseFloat(firstDataRow[1])
//       setCurrentPrice(currentPrice)

//       // Parse remaining data for chart
//       const parsedData = lines.slice(1).map((line, index) => {
//         // const values = line.split()
//         return {
//           day: `Day ${index + 1}`,
//           open: parseFloat(line[1]),
//           close: parseFloat(line[2]),
//           volume: parseInt(line[3], 10)
//         }
//       }).filter(item => !isNaN(item.open) && !isNaN(item.close))
//       console.log(parsedData)
//       // Prepare Chart.js dataset
//       setChartData({
//         labels: parsedData.map(item => item.day),
//         datasets: [
//           {
//             label: "Open Price",
//             data: parsedData.map(item => item.open),
//             borderColor: "rgb(75, 192, 192)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             tension: 0.1
//           },
//           {
//             label: "Stock Volume",
//             data: parsedData.map(item => item.close),
//             borderColor: "rgb(255, 99, 132)",
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             tension: 0.1
//           }
//         ]
//       })
//     } catch (error: any) {
//       setError(error.message)
//       console.error("Error fetching stock data:", error)
//     } finally {
//       setLoading(false)
//     }

    
//   }

// return (
//     <div className="p-6 bg-white min-h-screen">
//       <Title className="text-black font-bold text-2xl">Company Stock Analysis</Title>
      
//       <form onSubmit={handleSubmit} className="mt-6">
//         <div className="flex gap-4">
//           <TextInput
//             className="flex-grow text-black"
//             placeholder="Enter company name..."
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//           <Button type="submit">
//             <Text className="text-black">Fetch Data</Text>
//           </Button>
//         </div>
//       </form>

//       {currentPrice && (
//         <Text className="mt-4 text-lg font-semibold text-black">
//           Current Price: ${currentPrice.toFixed(2)}
//         </Text>
//       )}

//       {/* SEC Reports Section */}
//       {/* <SecReports companyName={companyName} /> */}

//       {/* Chart Section */}
//       <div className="flex mt-6">
//         <div className="w-3/5"> {/* 60% width for the chart */}
//           {chartData && (
//             <Card>
//               <Title className="text-black font-bold">Stock Price History</Title>
//               <div className="h-[400px] mt-4">
//                 <Line
//                   data={chartData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                       y: {
//                         beginAtZero: false,
//                         title: {
//                           display: true,
//                           text: 'Price ($)',
//                           color: 'black'
//                         }
//                       },
//                       x: {
//                         title: {
//                           display: true,
//                           text: 'Days',
//                           color: 'black'
//                         }
//                       }
//                     },
//                     plugins: {
//                       legend: {
//                         position: 'top' as const,
//                         labels: {
//                           color: 'black'
//                         }
//                       },
//                       title: {
//                         display: true,
//                         text: 'Stock Price Trends',
//                         color: 'black'
//                       }
//                     }
//                   }}
//                 />
//               </div>
//             </Card>
//           )}
//         </div>

//         {/* News Section */}
//         <div className="w-2/5 ml-6"> {/* 40% width for the news */}
//           {companyName && <NewsDisplay companyName={companyName} />}
//         </div>
//       </div>

//       <EsgAndSdg companyName = {companyName} />
//     </div>
//   )
// }



// "use client"

// import { useEffect, useState } from "react"
// import { Title, Text, TextInput, Card } from "@tremor/react"
// import { Button } from "@/components/ui/button"
// // import {debounce} from "lodash"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title as ChartTitle,
//   Tooltip,
//   Legend
// } from "chart.js"
// import { Line } from "react-chartjs-2"
// import NewsDisplay from './NewsDisplay'
// import SecReports from "./SecRecordDisplay"
// import EsgAndSdg from "./esgandsdg"

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend)


// const delay = (ms: number) => new Promise ( resolve => setTimeout(resolve,ms));


// export default function CompaniesPage() {
//   const [companyName, setCompanyName] = useState("")
//   const [debouncedCompanyName, setDebouncedCompanyName] = useState("")
//   const [currentPrice, setCurrentPrice] = useState<number | null>(null)
//   const [chartData, setChartData] = useState<any>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [secRecord, setSecRecord] = useState<string | null>(null)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedCompanyName(companyName)
//     }, 300)

//     return () => clearTimeout(handler) // Cleanup previous timeout
//   }, [companyName])
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!companyName.trim()) return

//     setLoading(true)
//     setError(null)

//     try {
//       await delay(2000);
//       const response = await fetch(`http://192.168.24.150:6969/long_stocks/${companyName}`)
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json(); // Parse JSON
      
//       if (!Array.isArray(data) || !data.every(Array.isArray)) {
//         throw new Error("Unexpected data format! Expected an array of arrays.");
//       }
//       console.log("Fetched Data:", data)


//       const lines = data

//       const firstDataRow = lines[1] // Example: ["0", "187.23", "186.76", "69668800"]

//       // Ensure valid data parsing
//       if (firstDataRow.length < 3) throw new Error("Insufficient data")

//       // Extract current price
//       const currentPrice = parseFloat(firstDataRow[1])
//       setCurrentPrice(currentPrice)

//       // Parse remaining data for chart
//       const parsedData = lines.slice(1).map((line, index) => {
//         // const values = line.split()
//         return {
//           day: `Day ${index + 1}`,
//           open: parseFloat(line[1]),
//           close: parseFloat(line[2]),
//           volume: parseInt(line[3], 10)
//         }
//       }).filter(item => !isNaN(item.open) && !isNaN(item.close))
//       console.log(parsedData)
//       // Prepare Chart.js dataset
//       setChartData({
//         labels: parsedData.map(item => item.day),
//         datasets: [
//           {
//             label: "Open Price",
//             data: parsedData.map(item => item.open),
//             borderColor: "rgb(75, 192, 192)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             tension: 0.1
//           },
//           {
//             label: "Stock Volume",
//             data: parsedData.map(item => item.close),
//             borderColor: "rgb(255, 99, 132)",
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             tension: 0.1
//           }
//         ]
//       })
//     } catch (error: any) {
//       setError(error.message)
//       console.error("Error fetching stock data:", error)
//     } finally {
//       setLoading(false)
//     }

    
//   }

// return (
//     <div className="p-6 bg-white min-h-screen">
//       <Title className="text-black font-bold text-2xl">Company Stock Analysis</Title>
      
//       <form onSubmit={handleSubmit} className="mt-6">
//         <div className="flex gap-4">
//           <TextInput
//             className="flex-grow text-black"
//             placeholder="Enter company name..."
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//           />
//           <Button type="submit">
//             <Text className="text-black">Fetch Data</Text>
//           </Button>
//         </div>
//       </form>

//       {currentPrice && (
//         <Text className="mt-4 text-lg font-semibold text-black">
//           Current Price: ${currentPrice.toFixed(2)}
//         </Text>
//       )}

//       {/* SEC Reports Section */}
//       {/* <SecReports companyName={companyName} /> */}

//       {/* Chart Section */}
//       <div className="flex mt-6">
//         <div className="w-3/5"> {/* 60% width for the chart */}
//           {chartData && (
//             <Card>
//               <Title className="text-black font-bold">Stock Price History</Title>
//               <div className="h-[400px] mt-4">
//                 <Line
//                   data={chartData}
//                   options={{
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     scales: {
//                       y: {
//                         beginAtZero: false,
//                         title: {
//                           display: true,
//                           text: 'Price ($)',
//                           color: 'black'
//                         }
//                       },
//                       x: {
//                         title: {
//                           display: true,
//                           text: 'Days',
//                           color: 'black'
//                         }
//                       }
//                     },
//                     plugins: {
//                       legend: {
//                         position: 'top' as const,
//                         labels: {
//                           color: 'black'
//                         }
//                       },
//                       title: {
//                         display: true,
//                         text: 'Stock Price Trends',
//                         color: 'black'
//                       }
//                     }
//                   }}
//                 />
//               </div>
//             </Card>
//           )}
//         </div>

//         {/* News Section */}
//         <div className="w-2/5 ml-6"> {/* 40% width for the news */}
//           {companyName && <NewsDisplay companyName={companyName} />}
//         </div>
//       </div>

//       <EsgAndSdg companyName = {companyName} />
//     </div>
//   )
// } ( this )




"use client"

import { useEffect, useState } from "react"
import { Title, Text, TextInput, Card, Textarea } from "@tremor/react"
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
import NewsDisplay from "./NewsDisplay"
import EsgAndSdg from "./esgandsdg"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ChartTitle, Tooltip, Legend)

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function CompaniesPage() {
  const [companyName, setCompanyName] = useState("")
  const [currentPrice, setCurrentPrice] = useState<number | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [secRecord, setSecRecord] = useState<string | null>(null)
  const [newsFetched, setNewsFetched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyName.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Fetch SEC text first
      const secResponse = await fetch(`http://192.168.24.150:6969/sec_text/${companyName}`)
      if (!secResponse.ok) throw new Error(`SEC request failed: ${secResponse.status}`)
      const secData = await secResponse.text()
      setSecRecord(secData)

      await delay(1000) // Small delay to prevent request flooding

      // Fetch Stock Data
      const stockResponse = await fetch(`http://192.168.24.150:6969/long_stocks/${companyName}`)
      if (!stockResponse.ok) throw new Error(`Stock request failed: ${stockResponse.status}`)
      const stockData = await stockResponse.json()

      if (!Array.isArray(stockData) || !stockData.every(Array.isArray)) {
        throw new Error("Unexpected stock data format! Expected an array of arrays.");
      }
      console.log("Fetched Stock Data:", stockData)

      const firstDataRow = stockData[1]
      if (firstDataRow.length < 3) throw new Error("Insufficient stock data")
      setCurrentPrice(parseFloat(firstDataRow[1]))

      const parsedData = stockData.slice(1).map((line, index) => ({
        day: `Day ${index + 1}`,
        open: parseFloat(line[1]),
        close: parseFloat(line[2]),
        volume: parseInt(line[3], 10)
      })).filter(item => !isNaN(item.open) && !isNaN(item.close))

      setChartData({
        labels: parsedData.map(item => item.day),
        datasets: [
          {
            label: "Open Price",
            data: parsedData.map(item => item.open),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.1
          },
          {
            label: "Stock Volume",
            data: parsedData.map(item => item.close),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.1
          }
        ]
      })

      await delay(1000)
      setNewsFetched(true) // Allow News Display to fetch now
    } catch (error: any) {
      setError(error.message)
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <Title className="text-black font-bold text-2xl">Company Stock Analysis</Title>
      
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-4">
          <TextInput
            className="flex-grow text-black"
            placeholder="Enter company name..."
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Button type="submit">
            <Text className="text-black">Fetch Data</Text>
          </Button>
        </div>
      </form>

      {/* SEC Text Box */}
      <Card className="mt-6 p-4">
        <Title className="text-black font-bold">SEC ESG Summary</Title>
        <Textarea
          className="w-full h-40 mt-2 text-black border-gray-300 p-2"
          value={secRecord || "Fetching SEC text..."}
          readOnly
        />
      </Card>

      {currentPrice && (
        <Text className="mt-4 text-lg font-semibold text-black">
          Current Price: ${currentPrice.toFixed(2)}
        </Text>
      )}

      {/* Chart Section */}
      <div className="flex mt-6">
        <div className="w-3/5">
          {chartData && (
            <Card>
              <Title className="text-black font-bold">Stock Price History</Title>
              <div className="h-[400px] mt-4">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: false, title: { display: true, text: 'Price ($)', color: 'black' } },
                      x: { title: { display: true, text: 'Days', color: 'black' } }
                    },
                    plugins: {
                      legend: { position: 'top', labels: { color: 'black' } },
                      title: { display: true, text: 'Stock Price Trends', color: 'black' }
                    }
                  }}
                />
              </div>
            </Card>
          )}
        </div>

        {/* News Section (only fetch after stock data) */}
        <div className="w-2/5 ml-6">
          {newsFetched && companyName && <NewsDisplay companyName={companyName} />}
        </div>
      </div>

      <EsgAndSdg companyName={companyName} />
    </div>
  )
}