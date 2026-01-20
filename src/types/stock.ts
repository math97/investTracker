export interface StockQuote {
  symbol: string
  name: string
  price: number
  changesPercentage: number
  change: number
  previousClose: number
}

export interface StockData {
  symbol: string
  name: string
  price: number
  changePercent: number
  isPositive: boolean
}

declare global {
  interface Window {
    electronAPI: {
      fetchStocks: (symbols: string[]) => Promise<{
        success: boolean
        data?: StockQuote[]
        error?: string
      }>
    }
  }
}
