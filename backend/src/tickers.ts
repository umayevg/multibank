export type Tick = {
	symbol: string
	price: number
}

export const tickers: Tick[] = [
	{ symbol: "AAPL", price: 170 },
	{ symbol: "TSLA", price: 180 },
	{ symbol: "BTC-USD", price: 65000 },
	{ symbol: "ETH-USD", price: 3500 }
]

export function getHistorical(symbol: string, points = 100): HistoryPoint[] {
	const base = tickers.find(t => t.symbol === symbol)?.price || 100

	const data: HistoryPoint[] = []
	const now = Date.now()

	let price = base

	for (let i = 0; i < points; i++) {
		const volatility = Math.random() < 0.1 ? 0.2 : 0.05
		const percentChange = (Math.random() - 0.5) * volatility

		price = Math.max(0.01, price * (1 + percentChange))

		data.push({
			price: Math.round(price * 100) / 100,
			time: now - (points - i) * 60000
		})
	}

	return data
}


// Cache
type HistoryPoint = { price: number; time: number }
type CacheEntry = { data: HistoryPoint[]; ts: number }

const CACHE_TTL_MS = 30 * 1000 // 30 seconds

const historyCache: Record<string, CacheEntry> = {}


export function getHistoricalCached(symbol: string, points = 100): HistoryPoint[] {
	const key = `${symbol}:${points}`
	const now = Date.now()

	const entry = historyCache[key]
	if (entry && now - entry.ts < CACHE_TTL_MS) {
		return entry.data
	}

	const data = getHistorical(symbol, points)
	historyCache[key] = { data, ts: now }
	return data
}

// Clear cache
export function _clearHistoryCache() {
	for (const k of Object.keys(historyCache)) delete historyCache[k]
}