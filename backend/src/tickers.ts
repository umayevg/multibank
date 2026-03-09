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
		const change = (Math.random() - 0.5) * 5
		price = price + change

		data.push({
			price: Math.round(price * 100) / 100,
			time: Date.now() - (100 - i) * 60000
		})
	}

	return data
}