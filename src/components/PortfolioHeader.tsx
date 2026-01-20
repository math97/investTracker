interface PortfolioHeaderProps {
  totalChange: number
}

export function PortfolioHeader({ totalChange }: PortfolioHeaderProps) {
  const isPositive = totalChange >= 0
  const colorClass = isPositive ? 'text-stock-green bg-stock-green/20' : 'text-stock-red bg-stock-red/20'
  const sign = isPositive ? '+' : ''

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 bg-purple-accent rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="12" width="4" height="9" rx="1" />
          <rect x="10" y="8" width="4" height="13" rx="1" />
          <rect x="17" y="4" width="4" height="17" rx="1" />
        </svg>
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Portfolio</p>
        <p className="text-white text-sm font-medium">Today</p>
      </div>
      <div className={`px-4 py-2 rounded-lg ${colorClass} flex items-center gap-2`}>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isPositive ? (
            <path d="M3 17l4-4 4 4 10-10M14 7h7v7" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M3 7l4 4 4-4 10 10M14 17h7v-7" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
        <span className="text-sm font-bold">
          {sign}{totalChange.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}
