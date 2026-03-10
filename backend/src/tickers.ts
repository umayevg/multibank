export const tickers = [
	{ symbol: "AAPL", price: 170 },
	{ symbol: "TSLA", price: 180 },
	{ symbol: "BTC-USD", price: 65000 },
	{ symbol: "ETH-USD", price: 3500 }
]

export function getHistorical(symbol: string) {
	const base = tickers.find(t => t.symbol === symbol)?.price || 100

	const data = []

	let price = base

	for (let i = 0; i < 100; i++) {
		const volatility = Math.random() < 0.1 ? 0.2 : 0.05
		const percentChange = (Math.random() - 0.5) * volatility
		price = price * (1 + percentChange)

		data.push({
			price: Math.round(price * 100) / 100,
			time: Date.now() - (100 - i) * 60000
		})
	}

	return data
}