declare module 'yfinance' {
  export interface Ticker {
    history(period: string): Promise<any[]>
  }
  
  export function Ticker(symbol: string): Promise<Ticker>
} 