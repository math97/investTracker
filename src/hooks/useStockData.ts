import { useState, useEffect, useCallback } from 'react'
import type { StockData } from '../types/stock'
import { fetchStockData } from '../services/stockApi'

const REFRESH_INTERVAL = 60000 // 1 minute

export function useStockData() {
  const [stocks, setStocks] = useState<StockData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const refresh = useCallback(async () => {
    try {
      setError(null)
      const data = await fetchStockData()
      setStocks(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [refresh])

  return { stocks, loading, error, lastUpdated, refresh }
}
