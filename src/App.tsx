import { useStockData } from './hooks/useStockData'
import { calculatePortfolioChange } from './services/stockApi'
import { StockCard } from './components/StockCard'
import { PortfolioHeader } from './components/PortfolioHeader'

function App() {
  const { stocks, loading, error, lastUpdated } = useStockData()
  const portfolioChange = calculatePortfolioChange(stocks)

  if (loading && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="text-gray-400">Loading stocks...</div>
      </div>
    )
  }

  if (error && stocks.length === 0) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="text-stock-red">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-app-bg p-4 pt-10 app-drag">
      <div className="border border-card-border rounded-2xl p-4">
        <PortfolioHeader totalChange={portfolioChange} />

        <div className="grid grid-cols-2 gap-2">
          {stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>

        {lastUpdated && (
          <p className="text-center text-gray-600 text-xs mt-3">
            Updated {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default App
