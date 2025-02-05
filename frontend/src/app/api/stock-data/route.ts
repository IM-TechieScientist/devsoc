import { NextResponse } from "next/server"
import yfinance from "yfinance"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol")

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  try {
    const ticker = await yfinance.Ticker(symbol)
    const history = await ticker.history("1mo")

    const stockData = history.map((item: any) => ({
      date: item.date.toISOString().split("T")[0],
      price: item.close,
      volume: item.volume,
    }))

    return NextResponse.json(stockData)
  } catch (error) {
    console.error("Error fetching stock data:", error)
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}

