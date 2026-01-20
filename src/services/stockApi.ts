import type { StockQuote, StockData } from '../types/stock'

export const TRACKED_STOCKS = ['ADBE', 'UBER', 'AMZN', 'UNH', 'NVDA', 'AMD']

export async function fetchStockData(): Promise<StockData[]> {
  const result = await window.electronAPI.fetchStocks(TRACKED_STOCKS)

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch stock data')
  }

  return result.data.map((quote: StockQuote) => ({
    symbol: quote.symbol,
    name: quote.name,
    price: quote.price,
    changePercent: quote.changesPercentage,
    isPositive: quote.changesPercentage >= 0,
  }))
}

export function calculatePortfolioChange(stocks: StockData[]): number {
  if (stocks.length === 0) return 0
  const totalChange = stocks.reduce((sum, stock) => sum + stock.changePercent, 0)
  return totalChange / stocks.length
}
