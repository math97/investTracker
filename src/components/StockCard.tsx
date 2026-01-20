import type { StockData } from '../types/stock'

interface StockCardProps {
  stock: StockData
}

export function StockCard({ stock }: StockCardProps) {
  const { symbol, price, changePercent, isPositive } = stock

  const colorClass = isPositive ? 'text-stock-green' : 'text-stock-red'
  const sign = isPositive ? '+' : ''

  return (
    <div className="bg-card-bg border border-card-border rounded-lg p-3 flex items-center gap-3">
      <span className="font-bold text-white text-sm tracking-wide min-w-[50px]">{symbol}</span>
      <span className="text-gray-300 text-sm">${price.toFixed(2)}</span>
      <div className={`flex items-center gap-1 ml-auto ${colorClass}`}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isPositive ? (
            <path d="M3 17l4-4 4 4 10-10M14 7h7v7" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M3 7l4 4 4-4 10 10M14 17h7v-7" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
        <span className="text-sm font-medium">
          {sign}{changePercent.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
